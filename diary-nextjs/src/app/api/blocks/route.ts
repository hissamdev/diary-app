import { handleDecryption } from "@/utils/functions/encrypt";
import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get("entryId");
    const parsedId = Number(entryId);
    if (Number.isNaN(parsedId)) {
        return NextResponse.json({
            success: false,
            message: "Invalid body",
        });
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
            status: 401,
        });
    }

    const isUserOwner = await db.query.journalEntry.findFirst({
        where: { id: parsedId, userId: session.user.id }, // Get the entry, check if it has the user's id.
    });

    if (Number.isNaN(parsedId) || !isUserOwner)
        return NextResponse.json({
            success: false,
            message: "Invalid request body or entry doesn't exist",
        });

    try {
        const res = await db.query.journalBlock.findMany({
            where: { entryId: parsedId },
            orderBy: { position: "asc" },
        });
        if (res.length === 0) {
            return NextResponse.json({
                success: true,
                message: "No blocks found, returning default",
                data: [{ type: "paragraph", content: "" }],
            });
        }

        // Decrypt
        const decryptedContent = await Promise.all(
            res.map(async (block: any) => ({
                ...block,
                content: await handleDecryption(
                    block.content.encryptedData,
                    block.content.iv,
                ),
            })),
        );

        return NextResponse.json({
            success: true,
            message: "Blocks found and retrieved successfully",
            data: decryptedContent,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Error retrieving blocks, sending default",
            data: [{ type: "paragraph", content: "" }],
        });
    }
}
