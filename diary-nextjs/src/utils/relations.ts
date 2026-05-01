import { defineRelations } from "drizzle-orm";
import {
    user,
    session,
    account,
    verification,
    journalBlock,
    journalEntry,
} from "./schema";

export const relations = defineRelations(
    { user, session, account, verification, journalEntry, journalBlock },
    (r) => ({
        journalBlock: {
            entry: r.one.journalEntry({
                from: r.journalBlock.entryId,
                to: r.journalEntry.id,
            }),
        },
        journalEntry: {
            user: r.one.user({
                from: r.journalEntry.userId,
                to: r.user.id,
            }),
            blocks: r.many.journalBlock(),
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
