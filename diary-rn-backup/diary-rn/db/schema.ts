import { sqliteTable, integer, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const dailyTable = sqliteTable("dailyTable", {
    id: integer().primaryKey({ autoIncrement: true }),
    date: text().notNull(),
    time: text().notNull(),
    customDate: text(),
    customTime: text(),
    textContent: text(),
    images: text({ mode: 'json' }),
});

export const templateTable = sqliteTable("templateTable", {
    id: integer().primaryKey({autoIncrement: true}),
    name: text().notNull(),
    type: text().notNull(),
    variant: text().notNull(),
    icon: text(),
    color: text(),
    position: integer(),
    data: text({ mode: 'json' }).notNull(),
});

export const propertiesTable = sqliteTable("propertiesTable", {
    id: integer().primaryKey({ autoIncrement: true }),

    dailyEntryId: integer()
        .notNull()
        .references(() => dailyTable.id),

    templatePropertyId: integer()
        .notNull()
        .references(() => templateTable.id, { onDelete: 'cascade' }),
    
    data: text({ mode: 'json' }).notNull(),
}, (table) => ({ // Make sure there are no duplicates
    uniqueDailyTemplate: uniqueIndex("unique_daily_template").on(
        table.dailyEntryId, table.templatePropertyId
    )
    })
);