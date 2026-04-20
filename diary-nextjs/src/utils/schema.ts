import { date, pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    createdAt: date("created_at").defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
