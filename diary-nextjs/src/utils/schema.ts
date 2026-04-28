import { defineRelations } from "drizzle-orm";
import {
    boolean,
    date,
    integer,
    json,
    pgTable,
    serial,
    text,
    uuid,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    createdAt: date("created_at").defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const journalEntry = pgTable("journal_entries", {
    id: serial("id").primaryKey(),
    createdAt: date("created_at").defaultNow().notNull(),
    lastUpdated: date("last_updated").defaultNow().notNull(),
    // If properties are unmodified, we will set properties based on tags later inserted.
    isPropertyModified: boolean("is_property_modified")
        .default(false)
        .notNull(),
});

export const journalBlock = pgTable("journal_blocks", {
    primaryKey: serial("primary_key").primaryKey(),
    entryId: integer("entry_id").notNull(),
    position: integer().notNull(),
    id: text().notNull().unique(),
    type: text().notNull(),
    props: json(),
    content: json(),
    children: json(),
});

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
