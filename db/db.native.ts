import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

export const DATABASE_NAME = 'db.db';
const expo = SQLite.openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expo);