import { sqliteTable, int, integer, text } from "drizzle-orm/sqlite-core";

export const templateTable = sqliteTable("templateTable", {
    id: int().primaryKey({autoIncrement: true}),
    name: text().notNull(),
    variant: text().notNull(),
    icon: text(),
    color: text(),
    checked: integer('is_checked', { mode: 'boolean' }).default(false)
})