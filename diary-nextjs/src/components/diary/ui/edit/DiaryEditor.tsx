"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DiaryInitialization from "../../utils/blocknote/DiaryInitialization";

export default function DiaryEditor() {
    const [id, setId] = useState<number>(0);
    const [saving, setSaving] = useState<boolean>(false);
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
    if (data) {
        console.log("data is: ", data);
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
                    data={data}
                    setData={setData}
                    setSaving={setSaving}
                />
            </div>
        </div>
    );
}
