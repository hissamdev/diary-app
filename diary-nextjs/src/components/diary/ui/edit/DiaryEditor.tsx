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
import DiaryInitialization from "../../utils/blocknote/DiaryInitialization";

export default function DiaryEditor({
    setSaving,
}: {
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [id, setId] = useState<number>(0);
    const [data, setData] = useState<any[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const localId = Number(localStorage.getItem("entryId"));
            if (!localId) {
                router.push("/diary");
                return;
            }
            setId(localId);

            const res = await fetch("/api/blocks", {
                method: "POST",
                body: JSON.stringify({ id: localId }),
            });
            const { data } = (await res.json()) as { data: any[] };
            const blocks = data;
            console.log("Type ", data);
            // @ts-ignore
            setData(blocks);
        };
        load();
    }, []);

    if (!data) {
        console.log("Not ready yet");
        return <div></div>;
    }

    return (
        <DiaryInitialization
            entryId={id}
            data={data}
            setData={setData}
            setSaving={setSaving}
        />
    );
}
