"use client";
import { ApiWithLatestEntry, Block, Entry } from "@/types/apis";
import { compareDate } from "@/utils/functions/compareDate";
import { LoaderCircle, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import DiaryEditorPreInit from "../../diary-edit/DiaryEditorPreInit";

export default function CurrentDayEntry() {
    const [entryExists, setEntryExists] = useState(true);
    const [latestEntry, setLatestEntry] = useState<Entry | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTodayEntry = async () => {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/entries/latest`,
            );
            if (!res.ok) {
                console.error(res.status, res.statusText);
            }
            const parsed: ApiWithLatestEntry = await res.json();
            if (!parsed.success) {
                console.error(parsed.message, parsed.error);
            }

            const bool = compareDate(parsed.data.createdAt);
            setEntryExists(true);
            setLatestEntry(parsed.data);
            console.log("From main component", parsed);
            setLoading(false);
        };

        getTodayEntry();
    }, []);

    return (
        <>
            <div className="mt-4 pb-1 flex justify-between items-end border-b border-black/25">
                <h2 className="font-manrope font-semibold text-3xl text-black">
                    Today's Entry
                </h2>

                {entryExists ? (
                    <span className="text-black">Edit</span>
                ) : (
                    <div className="flex gap-3 text-[#5D3FD3] hover:text-[#5D3FD3]/80 font-bold cursor-pointer">
                        Write today's entry <MoveRight />
                    </div>
                )}
            </div>
            <div
                className={`mt-4 ${loading ? "h-0" : "h-100"} transition-all duration-300 overflow-hidden`}
            >
                {entryExists ? (
                    <TodayEntry latestEntry={latestEntry} />
                ) : (
                    <CreateEntry />
                )}
            </div>
        </>
    );
}

type Props = {
    latestEntry: Entry | null;
};

function TodayEntry({ latestEntry }: Props) {
    if (!latestEntry) return null;

    return (
        <div className="mt-4">
            <DiaryEditorPreInit
                entryId={latestEntry.id}
                data={latestEntry.blocks}
            />
        </div>
    );
}

function CreateEntry() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <button
            onClick={() => setIsLoading((prev) => !prev)}
            className={`w-full flex justify-center items-center bg-[#5D3FD3] hover:bg-[#5D3FD3]/95 text-white text-xl font-manrope cursor-pointer ${isLoading ? "rounded-xs gap-4 h-30" : "rounded-[140px] gap-0 h-60"} transition-all duration-500`}
        >
            <div
                className={`text-right ${isLoading ? "-translate-x-2" : "translate-x-0"} transition-all duration-300 ease-out`}
            >
                Create today's entry...
            </div>
            <div
                className={`w-4 ${isLoading ? "opacity-100 translate-x-2" : "opacity-0 -translate-x-6"} transition-all duration-300`}
            >
                <LoaderCircle size={30} className="animate-spin" />
            </div>
        </button>
    );
}
