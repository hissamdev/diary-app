import { ArrowRight, Edit } from "lucide-react";
import DiaryHeader from "../../../diary-header/DiaryHeader";
import EntryBlocks from "./EntryBlocks";
import { Suspense } from "react";
import CreateDailyEntry from "./CreateDailyEntry";
import { isAuthenticated } from "@/actions/server";
import { redirect } from "next/navigation";

export default async function Entries() {
    const session = await isAuthenticated();
    if (session) return redirect("/");

    return (
        <div className="w-full">
            <DiaryHeader />
            <div className="mx-auto max-w-4xl flex-1 px-16 pt-36">
                <div className="text-black">
                    <h1>Journal Entries</h1>
                    <p>Track your daily thoughts and wellbeing</p>
                </div>
                <CreateDailyEntry />
                <div className="mt-8 flex justify-between">
                    <h2 className="text-xl text-black">Recent Activity</h2>
                    <span className="cursor-pointer self-end rounded border border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                        Filter
                    </span>
                </div>

                {!session ? (
                    <Suspense>
                        <EntryBlocks />
                    </Suspense>
                ) : (
                    <div>Not authenticated</div>
                )}
            </div>
        </div>
    );
}
