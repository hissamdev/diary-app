import { ApiResponse } from "@/types/apis";
import { EditEntry } from "./EntryEdit";
import { headers } from "next/headers";
import { DotSquare, Ellipsis } from "lucide-react";

export type EntryRes = {
    success: boolean;
    message: string;
    error: unknown;
    data: [
        {
            userId: string;
            id: number;
            createdAt: string;
            lastUpdated: string;
            // If properties are unmodified, we will set properties based on tags later inserted.
            isPropertyModified: boolean;
            blocks: any[];
        },
    ];
};

export type EntryData = {
    data: {
        userId: string;
        id: number;
        createdAt: string;
        lastUpdated: string;
        // If properties are unmodified, we will set properties based on tags later inserted.
        isPropertyModified: boolean;
        blocks: any[];
    };
};

export default async function EntryBlocks() {
    const res = await fetch("http://localhost:3000/api/entries", {
        headers: await headers(),
        credentials: "include",
    });
    const json: EntryRes = await res.json();
    if (!json.success) {
        console.error(json.message, json.error);
        return;
    }
    const entriesWithDate = json.data.map((entry) => ({
        ...entry,
        createdAt: new Date(entry.createdAt),
        lastUpdated: new Date(entry.lastUpdated),
    }));
    const entries = entriesWithDate;

    return (
        <div className="mt-5 grid grid-cols-1 gap-y-3">
            {entries.map((entry) => {
                const dateFormatted = entry.createdAt.toLocaleDateString(
                    "en-US",
                    {
                        day: "2-digit",
                    },
                );
                const dayFormatted = entry.createdAt.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short",
                    },
                );
                const timeFormatted = entry.createdAt.toLocaleTimeString(
                    "en-US",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                    },
                );

                return (
                    <div key={entry.id} className="entry mt-3 flex">
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <h3 className="pt-3 text-3xl font-bold text-black">
                                    {dateFormatted}
                                </h3>
                                {/* <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-xs text-white uppercase">
                                    Just Now
                                </span> */}
                                <h4 className=" tracking-widest font-semibold font-manrope text-[#6366F1]">
                                    {dayFormatted}
                                </h4>
                            </div>
                        </div>
                        <div className="ml-16 w-full">
                            <div className="w-full flex justify-between">
                                <div className="flex items-center gap-6">
                                    <span className="font-semibold font-inter text-[#6366F1]">
                                        {timeFormatted}
                                    </span>
                                    <Ellipsis className="text-black" />
                                </div>
                                <EditEntry entryId={entry.id} />
                            </div>
                            <div className="mt-2">
                                {entry.blocks.map((block) => {
                                    return (
                                        <p
                                            key={block?.id}
                                            className="text-black text-[17px] font-manrope"
                                        >
                                            {block?.content?.map(
                                                (text: any) => {
                                                    return text.text;
                                                },
                                            )}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
