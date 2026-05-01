import { db } from "@/utils/db";
import { journalEntry } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { userId } = body as { userId: string };
    if (!userId || typeof userId !== "string") {
        return NextResponse.json({
            success: false,
            message: "Invalid userId",
        });
    }
    try {
        await db.insert(journalEntry).values({
            userId: userId,
        });
        return Response.json({
            message: "Created entry successfully",
            success: true,
        });
    } catch (e) {
        console.error(e);
        return Response.json({
            message: "Failed to create entry",
            success: false,
        });
    }
}
