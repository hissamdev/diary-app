import { timeStamp } from "console";
import { defineRelations } from "drizzle-orm";
import {
    boolean,
    date,
    index,
    integer,
    json,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

// BetterAuth Tables

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const session = pgTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
    "account",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at"),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
    "verification",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("verification_identifier_idx").on(table.identifier)],
);

// Journal Tables

export const journalEntry = pgTable("journal_entries", {
    userId: text("user_id").notNull(),
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", {
        mode: "date",
        withTimezone: true,
        precision: 3,
    })
        .defaultNow()
        .notNull(),
    lastUpdated: timestamp("last_updated", {
        mode: "date",
        withTimezone: true,
        precision: 3,
    })
        .defaultNow()
        .notNull(),
    // If properties are unmodified, we will set properties based on tags later inserted.
    isPropertyModified: boolean("is_property_modified")
        .default(false)
        .notNull(),
});

export const journalBlock = pgTable("journal_blocks", {
    primaryKey: serial("primary_key").primaryKey(), // Had to name the column primaryKey as blocknote requires an id column.
    entryId: integer("entry_id").notNull(),
    position: integer().notNull(),
    id: text().notNull().unique(),
    type: text().notNull(),
    props: json(),
    content: json(),
    children: json(),
});

export const journalTags = pgTable("journal_tags", {
    id: serial("id").primaryKey(),
    blockId: integer().notNull(),
});

export const relations = defineRelations(
    {
        user,
        session,
        account,
        verification,
        journalEntry,
        journalBlock,
        journalTags,
    },
    (r) => ({
        journalEntry: {
            user: r.one.user({
                from: r.journalEntry.userId,
                to: r.user.id,
            }),

            blocks: r.many.journalBlock(),
        },

        journalBlock: {
            entry: r.one.journalEntry({
                from: r.journalBlock.entryId,
                to: r.journalEntry.id,
            }),

            tags: r.many.journalTags(),
        },

        journalTags: {
            block: r.one.journalBlock({
                from: r.journalTags.blockId,
                to: r.journalBlock.primaryKey,
            }),
        },

        user: {
            entries: r.many.journalEntry(),
            sessions: r.many.session({
                from: r.user.id,
                to: r.session.userId,
            }),
            accounts: r.many.account({
                from: r.user.id,
                to: r.account.userId,
            }),
        },
        session: {
            user: r.one.user({
                from: r.session.userId,
                to: r.user.id,
            }),
        },
        account: {
            user: r.one.user({
                from: r.account.userId,
                to: r.user.id,
            }),
        },
    }),
);
