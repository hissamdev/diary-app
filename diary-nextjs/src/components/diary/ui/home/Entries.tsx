import { ArrowRight, Edit } from "lucide-react";
import DiaryHeader from "../../diary-header/DiaryHeader";
import { getEntries } from "@/actions/actions";
import { useEntryContext } from "../../utils/context/entry/EntryContext";
import { EditEntry } from "./EntryEdit";

export default async function Entries() {
    const entries = await getEntries();

    return (
        <div className="w-full">
            <DiaryHeader />
            <div className="mx-auto max-w-4xl flex-1 px-16 pt-36">
                <div className="text-black">
                    <h1>Journal Entries</h1>
                    <p>Track your daily thoughts and wellbeing</p>
                </div>
                <div className="mt-5 flex cursor-pointer items-center justify-between rounded-xl bg-indigo-600 p-6">
                    <div>
                        <h3>Today, 10 Apr</h3>
                        <p>How was your day?</p>
                    </div>
                    <div className="flex aspect-square items-center rounded-full bg-white/20">
                        <ArrowRight className="w-12" />
                    </div>
                </div>
                <div className="mt-8 flex justify-between">
                    <h2 className="text-xl text-black">Recent Activity</h2>
                    <span className="cursor-pointer self-end rounded border border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                        Filter
                    </span>
                </div>

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
                                        Title goes here and id is {entry.id}
                                    </h2>
                                    <p className="mt-3 text-black">
                                        First couple lines of the diary go here
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
