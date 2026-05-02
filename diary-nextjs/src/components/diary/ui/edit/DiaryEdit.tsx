"use client";

import { useState } from "react";
import DiaryEditorPreInit from "./DiaryEditorPreInit";
import EditorHeader from "./EditorHeader";

export default function DiaryEdit() {
    const [saving, setSaving] = useState(false);
    const [entryId, setEntryId] = useState(0);

    return (
        <>
            <EditorHeader saving={saving} entryId={entryId} />
            <DiaryEditorPreInit
                setSaving={setSaving}
                entryId={entryId}
                setEntryId={setEntryId}
            />
        </>
    );
}
