"use server";

import { db } from "@/utils/db";
import { journalBlock, journalEntry, usersTable } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function getEntries() {
    const entries = await db.select().from(journalEntry);

    return entries;
}

export async function getBlocks(id: number) {
    console.log("Id is: ", id);
    const blocks = await db
        .select()
        .from(journalBlock)
        .where(eq(journalBlock.entryId, id));

    if (blocks.length === 0) {
        console.error("No matching blocks were found");
        return [{}];
    }

    return blocks;
}

export async function propagateBlockUpdates() {}
