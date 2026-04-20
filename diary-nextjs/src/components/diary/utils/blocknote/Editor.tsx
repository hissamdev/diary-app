"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
//@ts-ignore
import "@blocknote/core/fonts/inter.css";
//@ts-ignore
import "@blocknote/shadcn/style.css";

export default function Editor() {
    const editor = useCreateBlockNote();

    return <BlockNoteView editor={editor} className="w-2xl bg-gray-200" />;
}
