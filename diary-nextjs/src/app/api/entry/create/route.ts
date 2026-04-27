import { db } from "@/utils/db";
import { journalEntry } from "@/utils/schema";

export async function POST(request: Request) {
    try {
        await db.insert(journalEntry).values({});
        return Response.json({ status: 201 });
    } catch (e) {
        console.error("Failed to create entry: ", e);
    }
}
