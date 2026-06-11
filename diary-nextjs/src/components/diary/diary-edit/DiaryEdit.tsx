"use client";

import { Suspense, useEffect, useState } from "react";
import DiaryEditorPreInit from "./DiaryEditorPreInit";
import EditorHeader from "./EditorHeader";
import EditSidebar from "./EditSidebar";
import { useRouter } from "next/navigation";
import { ApiWithEntries, Entry } from "@/types/apis";

export default function DiaryEdit() {
    const [saving, setSaving] = useState(false);
    const [entryId, setEntryId] = useState(0);
    const [open, setOpen] = useState(false);
    const [allEntries, setAllEntries] = useState<Entry[]>([]);
    const [data, setData] = useState<any[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchInitialData = async () => {
            // Use entryId stored in localStorage to fetch blocks of a specific entry
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

            const json: ApiWithEntries = await res.json();
            if (!json.success) {
                console.error(json.message);
                return;
            }
            const blocks = json.data;
            // @ts-ignore
            setData(blocks);

            // Get all entries for sidebar
            const entryRes = await fetch("/api/entries", {
                method: "GET",
            });
            const currentEntries: ApiWithEntries = await entryRes.json();
            if (!currentEntries.success) {
                console.error(entryRes);
            }
            setAllEntries(currentEntries.data);
        };
        fetchInitialData();
    }, []);

    return (
        <div className="flex">
            <EditSidebar
                open={open}
                setOpen={setOpen}
                allEntries={allEntries}
            />
            <div className="w-full">
                <EditorHeader
                    saving={saving}
                    entryId={entryId}
                    setOpen={setOpen}
                />
                <Suspense>
                    <DiaryEditorPreInit
                        setSaving={setSaving}
                        entryId={entryId}
                        setEntryId={setEntryId}
                        data={data}
                    />
                </Suspense>
            </div>
        </div>
    );
}
