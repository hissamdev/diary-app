"use server";

import { db } from "@/utils/db";
import { journalEntry, usersTable } from "@/utils/schema";

export async function getEntries() {
    const entries = await db.select().from(journalEntry);

    return entries;
}
