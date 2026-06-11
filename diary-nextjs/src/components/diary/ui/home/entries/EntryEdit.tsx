"use client";

import { Edit } from "lucide-react";
import Link from "next/link";
import { EntryRes } from "./EntryBlocks";
import { useEntryContext } from "@/components/diary/utils/context/entry/EntryContext";

type Props = {
    entryId: number;
    allEntries: EntryRes["data"];
};

export function EditEntry({ entryId, allEntries }: Props) {
    // const { setAllEntries } = useEntryContext();
    // setAllEntries(allEntries);

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
