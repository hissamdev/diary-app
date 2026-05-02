import { ArrowRight, Edit } from "lucide-react";
import DiaryHeader from "../../../diary-header/DiaryHeader";
import EntryBlocks from "./EntryBlocks";
import { Suspense } from "react";
import CreateDailyEntry from "./CreateDailyEntry";
import { isAuthenticated } from "@/actions/server";
import { redirect } from "next/navigation";
import SignIn from "./auth/SignIn";

export default async function Entries() {
    const session = await isAuthenticated();

    return (
        <div className="px-25 max-w-7xl w-full">
            <DiaryHeader />
            <div className="mx-auto w-full flex-1 pt-8">
                <div className="text-black">
                    <h1 className="font-maprope text-[60px] leading-15 tracking-[-3px]">
                        How was your day?
                    </h1>
                    <p>Track your daily thoughts and wellbeing</p>
                </div>
                <CreateDailyEntry />
                <div className="mt-8 flex justify-between">
                    <h2 className="text-xl text-black">Recent Activity</h2>
                    <span className="cursor-pointer self-end rounded border border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                        Filter
                    </span>
                </div>

                {session ? (
                    <Suspense>
                        <EntryBlocks />
                    </Suspense>
                ) : (
                    <SignIn />
                )}
            </div>
        </div>
    );
}
