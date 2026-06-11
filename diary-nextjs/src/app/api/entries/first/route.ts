import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized or entry not found",
        });
    }

    const res = await db.query.journalEntry.findFirst({
        where: { userId: session?.user.id },
        columns: {
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    });

    if (!res) {
        return NextResponse.json({
            success: false,
            message: "Entry not found",
        });
    }

    return NextResponse.json({
        success: true,
        message: "Returning latest entry creation date",
        data: res,
    });
}
