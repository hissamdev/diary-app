import { db } from "@/utils/db";

export async function POST(request: Request) {
    const { id } = (await request.json()) as { id: number };
    const parsedId = Number(id);

    if (!parsedId)
        return Response.json({
            success: false,
            message: "Invalid entryId or 0",
        });

    try {
        const res = await db.query.journalBlock.findMany({
            where: { entryId: parsedId },
            orderBy: { position: "asc" },
        });
        if (res.length === 0) {
            return Response.json({
                success: true,
                message: "No blocks found, returning default",
                data: JSON.stringify({ type: "paragraph", content: "" }),
            });
        }

        return Response.json({
            success: true,
            message: "Blocks retrieved successfully",
            data: res,
        });
    } catch (e) {
        console.error(e);
        return Response.json({
            success: false,
            message: "Error retrieving blocks",
            data: JSON.stringify({ type: "paragraph", content: "" }),
        });
    }
}
