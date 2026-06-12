import { handleDecryption } from "@/utils/functions/encrypt";
import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { DBEntry } from "@/types/apis";

export async function GET() {
    try {
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
        const res = (await db.query.journalEntry.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            with: {
                blocks: {
                    limit: 3,
                    orderBy: { position: "asc" },
                },
            },
        })) as DBEntry[];

        const decryptedContent = await Promise.all(
            res.map(async (entry) => ({
                ...entry,
                blocks: await Promise.all(
                    entry.blocks.map(async (block) => ({
                        ...block,
                        content: await handleDecryption(
                            block.content.encryptedData,
                            block.content.iv,
                        ),
                    })),
                ),
            })),
        );
        console.log("Entries fetched successfully");
        return NextResponse.json({
            success: true,
            message: "All entries fetched successfully",
            data: decryptedContent,
        });
    } catch (e) {
        console.error("Failed to fetch entries:", e);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch entries",
            error: e,
        });
    }
}
