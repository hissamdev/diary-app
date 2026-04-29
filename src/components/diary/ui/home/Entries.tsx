import { ArrowRight, Edit } from "lucide-react";
import DiaryHeader from "../../diary-header/DiaryHeader";
import { getEntries } from "@/actions/actions";
import { useEntryContext } from "../../utils/context/entry/EntryContext";
import { EditEntry } from "./EntryEdit";
import EntryBlocks from "./EntryBlocks";
import { Suspense } from "react";

export default async function Entries() {
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

                <Suspense
                    fallback={
                        <div className="mt-7 py-27 text-black font-medium text-2xl text-center bg-gray-300 rounded-4xl">
                            Loading Entries...
                        </div>
                    }
                >
                    <EntryBlocks />
                </Suspense>
            </div>
        </div>
    );
}
