"use server";

import { db } from "@/utils/db";
import { journalBlock, journalEntry, usersTable } from "@/utils/schema";
import { eq, asc, notInArray, and } from "drizzle-orm";

export async function getEntries() {
    const entries = db.query.journalEntry.findMany({
        with: {
            blocks: {
                orderBy: { position: "asc" },
                limit: 1,
            },
        },
    });

    return entries;
}

export async function getBlocks(id: number) {
    if (!id) return console.log("Id is zero");

    const blocks = await db
        .select()
        .from(journalBlock)
        .where(eq(journalBlock.entryId, id))
        .orderBy(asc(journalBlock.position));

    if (blocks.length === 0) {
        console.log("No matching blocks were found, entry id: ", id);
        return [];
    }

    console.log(
        "Matching blocks were found, entry id: ",
        id,
        "blocks: ",
        blocks,
    );
    return blocks;
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

export async function createEntry() {
    await db.insert(journalEntry).values({});
}
