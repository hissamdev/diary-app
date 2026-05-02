"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DiaryInitialization from "../../utils/blocknote/DiaryInitialization";
import { ApiResponse } from "@/types/apis";

export default function DiaryEditor() {
    const [id, setId] = useState<number>(0);
    const [saving, setSaving] = useState<boolean>(false);
    const [data, setData] = useState<any[] | null>([
        { type: "paragraph", content: "" },
    ]);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const localEntryId = Number(localStorage.getItem("entryId"));
            if (!localEntryId) {
                router.push("/diary");
                return;
            }
            setId(localEntryId);

            const res = await fetch("/api/blocks", {
                method: "POST",
                body: JSON.stringify({ entryId: localEntryId }),
            });

            const { data, success, message }: ApiResponse = await res.json();
            if (!success) {
                console.error(message);
                return;
            }
            console.log(message, data);
            const blocks = data;
            // @ts-ignore
            setData(blocks);
        };
        load();
    }, []);

    if (!data || data?.length === 0) {
        console.log("Not ready yet, ", data);
        return <div></div>;
    }

    if (data.length > 0) {
        console.log("Ready: ", data);
    }

    return (
        <div>
            <div className="max-w-7xl px-14 w-full mx-auto py-4 flex justify-between items-center text-sm font-inter">
                <div>
                    <p>Entry Id: {id}</p>
                </div>
                <div className="w-12">
                    {saving ? (
                        <p className="text-gray-400">Saving...</p>
                    ) : (
                        <p className="text-gray-400 font-inter">Saved</p>
                    )}
                </div>
            </div>
            <div className="mx-auto mt-16 max-w-7xl w-full ">
                <DiaryInitialization
                    entryId={id}
                    // @ts-ignore
                    data={data}
                    setData={setData}
                    setSaving={setSaving}
                />
            </div>
        </div>
    );
}
