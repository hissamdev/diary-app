import { useCreateBlockNote } from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
//@ts-ignore
import "@blocknote/mantine/style.css";
// Include the included Inter font
//@ts-ignore
import "@blocknote/core/fonts/inter.css";
import { useEffect, useRef, useState } from "react";
import { propagateBlockUpdates } from "@/actions/server";
import { useRouter } from "next/navigation";

type Props = {
    entryId: number;
    data: any[];
    setData: React.Dispatch<React.SetStateAction<any[] | null>>;
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DiaryInitialization({
    entryId,
    data,
    setData,
    setSaving,
}: Props) {
    const timer = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const handleSave = async () => {
        if (timer.current) clearTimeout(timer.current);
        setData(editor.document);

        const currentData = editor.document;

        if (currentData.length === 0 || currentData?.[0]?.id === null) return;

        if (!entryId) {
            router.push("/diary");
            return;
        }

        setSaving(true);
        timer.current = setTimeout(async () => {
            const res = await propagateBlockUpdates(currentData, entryId);

            if (res.success) {
                console.log("Saved successfully");
            } else {
                console.error("Document failed to save");
            }
            setSaving(false);
        }, 1000);
    };

    console.log("Data before init: ", data);

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
                onChange={handleSave}
                className="[&>.bn-editor]:min-h-120 w-full"
                theme={{
                    light: darkTheme,
                    dark: darkTheme,
                }}
            />
        </>
    );
}
