"use client";

import { Edit } from "lucide-react";
import { useEntryContext } from "../../utils/context/entry/EntryContext";

export function EditEntry({ entryId }: { entryId: number }) {
    const { id, setId } = useEntryContext();

    return (
        <div className="flex cursor-pointer items-center gap-1 rounded bg-indigo-100 px-2 py-0.5 text-[12px] font-bold tracking-wide text-indigo-600 uppercase transition-colors hover:bg-indigo-100/70">
            <Edit className="w-3" />
            Edit
        </div>
    );
}
