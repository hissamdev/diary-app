"use server";

import { db } from "@/utils/db";
import { journalBlock, journalEntry, usersTable } from "@/utils/schema";
import { eq, asc, notInArray } from "drizzle-orm";

export async function getEntries() {
    const entries = db
        .select()
        .from(journalEntry)
        .orderBy(asc(journalEntry.id));

    return entries;
}

export async function getBlocks(id: number) {
    console.log("Id is: ", id);
    const blocks = await db
        .select()
        .from(journalBlock)
        .where(eq(journalBlock.entryId, id))
        .orderBy(asc(journalBlock.position));

    if (blocks.length === 0) {
        console.error("No matching blocks were found");
        return [{}];
    }

    return blocks;
}

export async function propagateBlockUpdates(doc: any[]) {
    const withPosition = doc.map((block, index) => ({
        ...block,
        position: (index + 1) * 10,
    }));

    try {
        await Promise.all(
            withPosition.map((block) => {
                db.transaction(async (tx) => {
                    tx.insert(journalBlock)
                        .values({
                            entryId: block.id,
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
                                type: block.id,
                                props: block.props,
                                content: block.content,
                                children: block.children,
                            },
                        });

                    db.delete(journalBlock).where(
                        notInArray(journalBlock.id, block.id),
                    );
                });
            }),
        );

        return {
            message: "Changes have been propogated to remote database",
            success: true,
        };
    } catch (e) {
        return {
            message:
                "Server action failed to propagate changes to remote database",
            success: false,
        };
    }
}

export async function createEntry() {
    await db.insert(journalEntry).values({});
}
