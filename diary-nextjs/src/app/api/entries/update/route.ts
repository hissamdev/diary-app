import { Blocks } from "@/types/drizzle";
import { db } from "@/utils/db";
import { journalBlock } from "@/utils/schema";
import { and, eq, notInArray } from "drizzle-orm";

export async function PUT(request: Request) {
    const body = await request.json();
    const { data, entryId } = body as { data: any[]; entryId: number };

    if (!Array.isArray(data) || data.length === 0 || !entryId) {
        return Response.json({
            success: false,
            message: "Invalid request body",
        });
    }

    const withPosition: Blocks = data.map((block, index) => ({
        ...block,
        entryId: entryId,
        position: (index + 1) * 10, // Avoids 0, starts from 10
    }));

    const blockIds: string[] = withPosition.map((block) => block.id);

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
                        content: block.content,
                        children: block.children,
                        props: block.props,
                    })
                    .onConflictDoUpdate({
                        target: journalBlock.id,
                        set: {
                            position: block.position,
                            type: block.type,
                            content: block.content,
                            children: block.children,
                            props: block.props,
                        },
                    });
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

        return Response.json({
            success: true,
            message: "Changes saved to remote database",
        });
    } catch (e) {
        console.error(e);
        return Response.json({
            success: false,
            message: "Failed to save changes to remote database",
            error: e,
        });
    }
}
