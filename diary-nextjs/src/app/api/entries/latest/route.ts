import { Block, DBBlock, DBEntry, Entry } from "@/types/apis";
import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { handleDecryption } from "@/utils/functions/encrypt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized or entry not found",
            });
        }

        const res = (await db.query.journalEntry.findFirst({
            where: { userId: session?.user.id },
            orderBy: { createdAt: "desc" },
            with: {
                blocks: {
                    orderBy: { position: "asc" },
                },
            },
        })) as DBEntry;

        if (!res) {
            console.log("Failed to find latest entry");
            return NextResponse.json({
                success: false,
                message: "Failed to find latest entry",
            });
        }

        const decryptedContent = await Promise.all(
            res.blocks.map(async (block) => ({
                ...block,
                content: await handleDecryption(
                    block.content.encryptedData,
                    block.content.iv,
                ),
            })),
        );

        console.log(
            "Latest entry successfully found\n",
            "Data:",
            decryptedContent,
        );
        return NextResponse.json({
            success: true,
            message: "Latest entry successfully found",
            data: { blocks: decryptedContent },
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Failed to return latest entry",
            error: e,
        });
    }
}
