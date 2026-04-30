import { db } from "@/utils/db";
import { journalEntry } from "@/utils/schema";

export async function POST(request: Request) {
    try {
        await db.insert(journalEntry).values({});
    } catch (e) {
        console.error(e);
    }

    return Response.json({
        message: "Created entry successfully",
        success: true,
    });
}
