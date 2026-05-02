"use client";

import { Edit } from "lucide-react";
import { useEntryContext } from "../../../utils/context/entry/EntryContext";
import Link from "next/link";

export function EditEntry({ entryId }: { entryId: number }) {
    const { setId } = useEntryContext();

    return (
        <Link
            onClick={() => localStorage.setItem("entryId", entryId.toString())}
            href="/diary/write"
            className="flex cursor-pointer items-center gap-2 rounded px-2 py-0.5 text-black font-manrope text-[17px] font-medium tracking-wide hover:bg-black/10"
        >
            <Edit className="w-3.5" />
            Edit
        </Link>
    );
}
