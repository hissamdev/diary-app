"use client";

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

export default function DiaryEditor() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const showLog = () => {
            return data;
        };

        showLog();
    }, [data]);

    const editor = useCreateBlockNote({
        initialContent: [
            { type: "paragraph", content: "Initial text here" },
            { type: "paragraph", content: "Initial text here" },
        ],
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
                className="[&>.bn-editor]:min-h-120"
                theme={{
                    light: darkTheme,
                    dark: darkTheme,
                }}
            />
        </>
    );
}
