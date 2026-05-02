"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/apis";
import { DynamicEditor } from "../../utils/blocknote/DynamicEditor";

type Props = {
    entryId: number;
    setEntryId: React.Dispatch<React.SetStateAction<number>>;
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DiaryEditorPreInit({
    entryId,
    setEntryId,
    setSaving,
}: Props) {
    const [data, setData] = useState<any[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const localEntryId = Number(localStorage.getItem("entryId"));
            if (!localEntryId) {
                router.push("/diary");
                return;
            }
            setEntryId(localEntryId);

            const res = await fetch("/api/blocks", {
                method: "POST",
                body: JSON.stringify({ entryId: localEntryId }),
            });

            const json: ApiResponse = await res.json();
            if (!json.success) {
                console.error(json.message);
                return;
            }
            console.log(json.message, json.data);
            const blocks = json.data;
            // @ts-ignore
            setData(blocks);
        };
        load();
    }, []);

    if (!Array.isArray(data) || !data || data?.length === 0) {
        return <div></div>;
    }

    return (
        <div>
            <div className="mx-auto mt-16 max-w-7xl w-full ">
                <DynamicEditor
                    entryId={entryId}
                    // @ts-ignore
                    data={data}
                    setData={setData}
                    setSaving={setSaving}
                />
            </div>
        </div>
    );
}
