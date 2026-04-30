export async function PUT(request: Request) {
    if (!id) return console.log("Id is zero or doesn't exist");

    const blocks = await db
        .select()
        .from(journalBlock)
        .where(eq(journalBlock.entryId, id))
        .orderBy(asc(journalBlock.position));

    if (blocks.length === 0) {
        console.log("No matching blocks were found, entry id: ", id);
        return [{ type: "paragraph", content: "" }];
    }

    console.log(
        "Matching blocks were found, entry id: ",
        id,
        "blocks: ",
        blocks,
    );
    return blocks;
}
