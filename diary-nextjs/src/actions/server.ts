"use server";

import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { journalBlock } from "@/utils/schema";
import { eq, notInArray, and } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function isAuthenticated() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    console.log("Returning session: ", session);
    return session;
}

export async function propagateBlockUpdates(doc: any[], entryId: number) {
    const withPosition = doc.map((block, index) => ({
        ...block,
        entryId,
        position: (index + 1) * 10,
    }));

    const blockIds = withPosition.map((block) => block.id);

    try {
        await db.transaction(async (tx) => {
            for (const block of withPosition) {
                await tx
                    .insert(journalBlock)
                    .values({
                        entryId: block.entryId,
                        position: block.position,
                        id: block.id,
                        type: block.type,
                        props: block.props,
                        content: block.content,
                        children: block.children,
                    })
                    .onConflictDoUpdate({
                        target: journalBlock.id,
                        set: {
                            position: block.position,
                            type: block.type,
                            props: block.props,
                            content: block.content,
                            children: block.children,
                        },
                    });
            }
            if (!entryId) {
                throw new Error("entryId is required");
            }
            await tx
                .delete(journalBlock)
                .where(
                    and(
                        eq(journalBlock.entryId, entryId),
                        notInArray(journalBlock.id, blockIds),
                    ),
                );
        });
        console.log(
            "Saved blocks: ",
            withPosition,
            "Server action successful with entryId: ",
            entryId,
        );
        revalidateTag("entries", "max");
        revalidatePath("/diary");
        return {
            message: "Changes have been propogated to remote database",
            success: true,
        };
    } catch (e) {
        console.error(e);
        return {
            message:
                "Server action failed to propagate changes to remote database",
            success: false,
            error: e,
        };
    }
}
