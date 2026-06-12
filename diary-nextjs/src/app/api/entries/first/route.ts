import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        console.log("Before auth", session?.session?.createdAt);
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
            console.log("Failed to find latest entry creation date in db");
            return NextResponse.json({
                success: false,
                message: "Entry not found",
            });
        }

        console.log("Returning latest entry creation date");
        return NextResponse.json({
            success: true,
            message: "Returning latest entry creation date",
            data: res,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Failed to return latest entry creation date",
            error: e,
        });
    }
}
