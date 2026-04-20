import {
    boolean,
    date,
    integer,
    pgTable,
    primaryKey,
    serial,
    text,
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
    content: text(),
    createdAt: date("created_at").defaultNow().notNull(),
    lastUpdated: date("last_updated").defaultNow().notNull(),
    // If properties are unmodified, we will set properties based on tags later inserted.
    isPropertiesUserModified: boolean("is_property_modified")
        .default(false)
        .notNull(),
});

export const journalBlocks = pgTable("journal_blocks", {
    id: serial().primaryKey(),
    type: text(),
    position: integer().notNull(),
});
