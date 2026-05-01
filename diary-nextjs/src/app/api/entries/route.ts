import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Not authorized",
            headers: session,
        });
    }
    const matchId = session?.user.id;

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
            error: e,
        });
    }
}
