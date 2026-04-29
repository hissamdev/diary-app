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
import { getBlocks, propagateBlockUpdates } from "@/actions/actions";
import { useRouter } from "next/navigation";
import DiaryInitialization from "./DiaryInitialization";

const retrievedData = [
    {
        id: "726e5145-bc2d-4343-b6a5-5229f2bad5a0",
        type: "paragraph",
        props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
        },
        content: [{ type: "text", text: "Initial text here", styles: {} }],
        children: [],
    },
    {
        id: "b66e9eda-d02f-4fa9-9487-3b8359f2deeb",
        type: "heading",
        props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
            level: 1,
            isToggleable: false,
        },
        content: [{ type: "text", text: "this is a heading", styles: {} }],
        children: [],
    },
    {
        id: "7ff06d72-2c8d-44d7-94ac-29da4950f6f9",
        type: "bulletListItem",
        props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
        },
        content: [{ type: "text", text: "bullet points be like", styles: {} }],
        children: [
            {
                id: "efd19363-d79b-41d8-b520-9e0dda468e00",
                type: "bulletListItem",
                props: {
                    backgroundColor: "default",
                    textColor: "default",
                    textAlignment: "left",
                },
                content: [
                    {
                        type: "text",
                        text: "sub bullet points be like",
                        styles: {},
                    },
                ],
                children: [],
            },
        ],
    },
    {
        id: "9a4c7181-847e-491a-bc11-0fd71558f672",
        type: "quote",
        props: { backgroundColor: "default", textColor: "default" },
        content: [
            {
                type: "text",
                text: "i guess this one would be a quote",
                styles: {},
            },
        ],
        children: [],
    },
    {
        id: "61a0642b-5d26-4a3f-831b-86291a78496d",
        type: "paragraph",
        props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
        },
        content: [],
        children: [],
    },
];

export default function DiaryEditor({
    setSaving,
}: {
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [data, setData] = useState<any[]>([]);
    const [id, setId] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            console.log("Test");
            const blocks = await getBlocks(
                Number(localStorage.getItem("entryId")),
            );
            if (!blocks) return console.error("No blocks retrieved.");
            console.log("Blocks received in front end: ", blocks);
            setData(blocks);
        };
        load();
    }, []);

    useEffect(() => {
        const id = Number(localStorage.getItem("entryId"));
        if (!id) {
            router.push("/diary");
            return;
        }
        setId(id);
    }, []);

    useEffect(() => {
        if (!id || data.length === 0) return;
        console.log("Saving the following blocks: ", data);
        setSaving(true);

        const debounce = setTimeout(async () => {
            const res = await propagateBlockUpdates(data, id);
            if (res?.success) {
                console.log(res.message);
                setSaving(false);
            } else {
                console.error(res?.message, "Error: ", res.error);
            }
        }, 1000);

        return () => clearTimeout(debounce);
    }, [data]);

    if (data.length === 0 || !data) {
        console.log("Not ready yet");
        return <div></div>;
    }

    return (
        <DiaryInitialization
            data={data}
            setData={setData}
            setSaving={setSaving}
        />
    );
}
