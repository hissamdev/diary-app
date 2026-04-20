import { pgTable, uniqueIndex, serial, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("User", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	name: text(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);
