import { ApiResponse } from "@/types/apis";
import { EditEntry } from "./EntryEdit";
import { headers } from "next/headers";

type EntryRes = {
    success: boolean;
    message: string;
    error: unknown;
    data: [
        {
            userId: string;
            id: number;
            createdAt: Date;
            lastUpdated: Date;
            // If properties are unmodified, we will set properties based on tags later inserted.
            isPropertyModified: boolean;
            blocks: any[];
        },
    ];
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
        <div className="grid grid-cols-1 gap-y-5">
            {entries.map((entry) => {
                const dateFormatted = entry.createdAt.toLocaleDateString(
                    "en-US",
                    {
                        day: "2-digit",
                        weekday: "short",
                        month: "short",
                        year: "numeric",
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
                    <div key={entry.id} className="entry mt-3">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <h4 className="text-lg font-bold text-black">
                                    Date: {dateFormatted} Time: {timeFormatted}
                                </h4>
                                <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-xs text-white uppercase">
                                    Just Now
                                </span>
                            </div>
                            <span className="aspect-square w-2 rounded-full bg-gray-300"></span>
                            <EditEntry entryId={entry.id} />
                        </div>
                        <div className="mt-4 rounded-lg border border-indigo-600/40 px-6 py-7">
                            <h2 className="text-lg font-bold text-black">
                                {(entry.blocks?.[0]?.content as any)?.[0]?.text}{" "}
                                Id: {entry.id}
                            </h2>
                            <p className="mt-3 text-black">
                                {
                                    (entry.blocks?.[1]?.content as any[])?.[0]
                                        ?.text
                                }
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
