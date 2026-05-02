"use client";

import { Suspense, useState } from "react";
import DiaryEditorPreInit from "./DiaryEditorPreInit";
import EditorHeader from "./EditorHeader";
import EditSidebar from "./EditSidebar";

export default function DiaryEdit() {
    const [saving, setSaving] = useState(false);
    const [entryId, setEntryId] = useState(0);
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            <EditSidebar open={open} setOpen={setOpen} />
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
                    />
                </Suspense>
            </div>
        </div>
    );
}
