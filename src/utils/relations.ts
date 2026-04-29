import { defineRelations } from "drizzle-orm";
import { journalBlock, journalEntry } from "./schema";
import * as schema from "./schema";

export const relations = defineRelations(
    { journalEntry, journalBlock },
    (r) => ({
        journalBlock: {
            entry: r.one.journalEntry({
                from: r.journalBlock.entryId,
                to: r.journalEntry.id,
            }),
        },
        journalEntry: {
            blocks: r.many.journalBlock(),
        },
    }),
);
