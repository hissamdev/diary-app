import { db } from "@/utils/db";

export async function GET(request: Request) {
    try {
        const res = await db.query.journalEntry.findMany({
            with: {
                blocks: {
                    limit: 3,
                    orderBy: { position: "asc" },
                },
            },
        });

        return Response.json({
            success: true,
            message: "All entries fetched successfully",
            data: res,
        });
    } catch (e) {
        console.error("Failed to fetch entries: ", e);
        return Response.json({
            success: false,
            message: "Failed to fetch all entries",
        });
    }
}
