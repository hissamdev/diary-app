import { getEntries } from "@/actions/actions";
import { EditEntry } from "./EntryEdit";

export default async function EntryBlocks() {
    const entries = await getEntries();

    return (
        <div className="grid grid-cols-1 gap-y-5">
            {entries.map((entry) => {
                return (
                    <div key={entry.id} className="entry mt-7">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <h4 className="text-lg font-bold text-black">
                                    Today, Apr 10 {entry.createdAt}
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
                                {(entry.blocks?.[0]?.content as any)?.[0].text}{" "}
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
