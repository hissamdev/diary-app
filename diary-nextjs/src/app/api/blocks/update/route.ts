import { Blocks } from "@/types/drizzle";
import { auth } from "@/utils/auth";
import { db } from "@/utils/db";
import { journalBlock } from "@/utils/schema";
import { and, eq, notInArray } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const body = await request.json();
    const { doc, entryId } = body as { doc: any[]; entryId: number };

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
        where: { id: entryId, userId: session.user.id },
    });

    // Sanitize
    if (!Array.isArray(doc) || doc.length === 0 || !entryId || !isUserOwner) {
        return NextResponse.json({
            success: false,
            message: "Invalid request body",
        });
    }

    const withPosition = doc.map((block, index) => ({
        ...block,
        entryId,
        position: (index + 1) * 10,
    }));

    const blockIds = withPosition.map((block) => block.id);

    try {
        await db.transaction(async (tx) => {
            for (const block of withPosition) {
                await tx
                    .insert(journalBlock)
                    .values({
                        entryId: block.entryId,
                        position: block.position,
                        id: block.id,
                        type: block.type,
                        props: block.props,
                        content: block.content,
                        children: block.children,
                    })
                    .onConflictDoUpdate({
                        target: journalBlock.id,
                        set: {
                            position: block.position,
                            type: block.type,
                            props: block.props,
                            content: block.content,
                            children: block.children,
                        },
                    });
            }
            if (!entryId) {
                throw new Error("entryId is required");
            }
            await tx
                .delete(journalBlock)
                .where(
                    and(
                        eq(journalBlock.entryId, entryId),
                        notInArray(journalBlock.id, blockIds),
                    ),
                );
        });
        revalidateTag("entries", "max");
        revalidatePath("/diary");
        return NextResponse.json({
            success: true,
            message: "Changes have been propogated to remote database",
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message:
                "Server action failed to propagate changes to remote database",
            success: false,
            error: e,
        });
    }
}
