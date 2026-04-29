import { useCreateBlockNote } from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
//@ts-ignore
import "@blocknote/mantine/style.css";
// Include the included Inter font
//@ts-ignore
import "@blocknote/core/fonts/inter.css";
import { useEffect, useState } from "react";
import { getBlocks, propagateBlockUpdates } from "@/actions/actions";
import { useRouter } from "next/navigation";

type Props = {
    data: any[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DiaryInitialization({
    data,
    setData,
    setSaving,
}: Props) {
    const editor = useCreateBlockNote({
        initialContent: data,
    });

    const darkTheme = {
        colors: {
            editor: {
                text: "#FFFFFFAA",
                background: "#1e1e1e",
            },
        },
    };

    return (
        <>
            <BlockNoteView
                editor={editor}
                onChange={() => {
                    setData(editor.document);
                }}
                className="[&>.bn-editor]:min-h-120 w-full"
                theme={{
                    light: darkTheme,
                    dark: darkTheme,
                }}
            />
        </>
    );
}
