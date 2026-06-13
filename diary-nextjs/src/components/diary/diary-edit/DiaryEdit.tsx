"use client";

import { Suspense, useEffect, useState } from "react";
import DiaryEditorPreInit from "./DiaryEditorPreInit";
import EditorHeader from "./EditorHeader";
import EditSidebar from "./EditSidebar";
import { useRouter } from "next/navigation";
import { ApiWithBlocks, ApiWithEntries, Block, Entry } from "@/types/apis";

export default function DiaryEdit() {
    const [saving, setSaving] = useState(false);
    const [entryId, setEntryId] = useState(0);
    const [open, setOpen] = useState(false);
    const [allEntries, setAllEntries] = useState<Entry[]>([]);
    const [data, setData] = useState<Block[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Use entryId stored in localStorage to fetch blocks of a specific entry
                const localEntryId = Number(localStorage.getItem("entryId"));
                if (!localEntryId) {
                    router.push("/diary");
                    return;
                }
                setEntryId(localEntryId);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/blocks?entryId=${localEntryId}`,
                );

                if (!res.ok) {
                    console.error("Fetch failed:", res.status, res.statusText);
                }

                const json: ApiWithBlocks = await res.json();
                if (!json.success) {
                    console.error(json.message);
                }
                const blocks: Block[] = json.data;
                setData(blocks);

                // Get all entries for sidebar
                const entryRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/entries`,
                );
                if (!entryRes.ok) {
                    console.error(entryRes.status, entryRes.statusText);
                }
                const currentEntries: ApiWithEntries = await entryRes.json();
                if (!currentEntries.success) {
                    console.error(currentEntries.message);
                }
                setAllEntries(currentEntries.data);
            } catch (e) {
                console.error("Failed to fetch blocks:", e);
                return <div>Error occured</div>;
            }
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
                        entryId={entryId}
                        setEntryId={setEntryId}
                        data={data}
                    />
                </Suspense>
            </div>
        </div>
    );
}
