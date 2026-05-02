"use server";

import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { journalBlock } from "@/utils/schema";
import { eq, notInArray, and } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function isAuthenticated() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session;
}

export async function getAllEntries() {
    const session = await isAuthenticated();
    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
            status: 401,
        });
    }

    try {
        const res = await db.query.journalEntry.findMany({
            where: { userId: session.user.id },
            with: {
                blocks: {
                    limit: 3,
                    orderBy: { position: "asc" },
                },
            },
        });

        return Response.json({
            success: true,
            message: "All entries fetched successfully",
            data: res,
        });
    } catch (e) {
        console.error("Failed to fetch entries: ", e);
        return Response.json({
            success: false,
            message: "Failed to fetch entries",
            error: e,
        });
    }
}

export async function propagateBlockUpdates(doc: any[], entryId: number) {
    const session = await isAuthenticated();

    const isUserOwner = db.query.journalEntry.findFirst({
        where: { id: entryId, userId: session?.user.id },
    });

    if (!session || !isUserOwner) {
        return {
            success: false,
            message: "Unauthorized",
            status: 401,
        };
    }

    // Sanitize
    if (!Array.isArray(doc))
        return {
            success: false,
            message: "Invalid document",
        };

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
