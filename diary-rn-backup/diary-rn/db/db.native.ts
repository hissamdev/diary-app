import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

import * as schema from './schema';

export const DATABASE_NAME = 'db.db';
export const expoDb = SQLite.openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expoDb, { schema });

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];