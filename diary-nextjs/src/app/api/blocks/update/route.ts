import { handleEncryption } from "@/components/diary/utils/encryption/encrypt";
import { Blocks } from "@/types/drizzle";
import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { journalBlock } from "@/utils/schema";
import { and, eq, notInArray, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const body = await request.json();
    const { doc, entryId } = body as { doc: any[]; entryId: number };

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
            status: 401,
        });
    }

    if (!entryId) {
        throw new Error("entryId is required");
    }

    const isUserOwner = db.query.journalEntry.findFirst({
        where: { id: entryId, userId: session.user.id }, // Does the user have access to the provided entry?
    });

    // Sanitize
    if (!Array.isArray(doc) || doc.length === 0 || !entryId || !isUserOwner) {
        return NextResponse.json({
            success: false,
            message: "Invalid request body",
        });
    }
    // Add entry Id, add a position column, hash the content column.
    const modifiedData = await Promise.all(
        doc.map(async (block, index) => ({
            ...block,
            entryId,
            position: (index + 1) * 10,
            content: await handleEncryption(block.content), // { encrypted: hash, iv: iv key }
        })),
    );

    const blockIds = modifiedData.map((block) => block.id);

    try {
        await db.transaction(async (tx) => {
            await tx
                .insert(journalBlock)
                .values(modifiedData)
                .onConflictDoUpdate({
                    target: journalBlock.id,
                    set: {
                        position: sql.raw(
                            `excluded.${journalBlock.position.name}`,
                        ),
                        type: sql.raw(`excluded.${journalBlock.type.name}`),
                        props: sql.raw(`excluded.${journalBlock.props.name}`),
                        content: sql.raw(
                            `excluded.${journalBlock.content.name}`,
                        ),
                        children: sql.raw(
                            `excluded.${journalBlock.children.name}`,
                        ),
                    },
                });

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
        return NextResponse.json({
            success: true,
            message: "Changes have been propogated to remote database",
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message:
                "Server action failed to propagate changes to remote database",
            success: false,
            error: e,
        });
    }
}
