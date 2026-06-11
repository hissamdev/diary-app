import { handleDecryption } from "@/components/diary/utils/encryption/encrypt";
import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { entryId } = (await request.json()) as { entryId: number };
    const parsedId = Number(entryId);

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

    const isUserOwner = db.query.journalEntry.findFirst({
        where: { id: entryId, userId: session.user.id }, // Get the entry, check if it has the user's id.
    });

    if (!parsedId || typeof parsedId !== "number" || !isUserOwner)
        return Response.json({
            success: false,
            message: "Invalid request body or entry doesn't exist",
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

        return Response.json({
            success: true,
            message: "Blocks found and retrieved successfully",
            data: decryptedContent,
        });
    } catch (e) {
        console.error(e);
        return Response.json({
            success: false,
            message: "Error retrieving blocks, sending default",
            data: JSON.stringify([{ type: "paragraph", content: "" }]),
        });
    }
}
