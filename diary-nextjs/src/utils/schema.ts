import { defineRelations } from "drizzle-orm";
import {
    boolean,
    date,
    integer,
    json,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

// BetterAuth Tables

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
    updatedAt: timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
});

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
    updatedAt: timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
        precision: 6,
        withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
        precision: 6,
        withTimezone: true,
    }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: timestamp("created_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
    updatedAt: timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
    createdAt: timestamp("created_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
    updatedAt: timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
    }).notNull(),
});

// Journal Tables

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
