"use client";
// This component exists to delay calling the initilization component, as we're delaying hook orders here, and having it in this file would bring hook order issues.
import { useEffect, useState } from "react";
import { ApiResponse } from "@/types/apis";
import { DynamicEditor } from "../../blocknote/DynamicEditor";

type Props = {
    entryId: number;
    setEntryId?: React.Dispatch<React.SetStateAction<number>>;
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
    data: any[] | null;
    setData?: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function DiaryEditorPreInit({
    entryId,
    setSaving,
    data,
}: Props) {
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
                    setSaving={setSaving}
                />
            </div>
        </div>
    );
}
