import { ApiWithEntries } from "@/types/apis";
import { EditEntry } from "../../ui/EntryEdit";
import { headers } from "next/headers";
import { Ellipsis } from "lucide-react";

export default async function EntryBlocks() {
    const res = await fetch("http://localhost:3000/api/entries", {
        headers: await headers(),
        credentials: "include",
    });
    if (!res.ok) {
        console.error(res.ok, res.status, res.statusText);
    }
    const json: ApiWithEntries = await res.json();

    if (!json.success) {
        console.error(json.message, json.error);
        return;
    }
    const entriesWithDate = json.data.map((entry) => ({
        ...entry,
        createdAt: new Date(entry.createdAt), // Format date
        lastUpdated: new Date(entry.lastUpdated),
    }));

    return (
        <div className="mt-5 grid grid-cols-1 gap-y-3">
            {entriesWithDate.map((entry) => {
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
                            <div className="mt-2 space-y-2">
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
