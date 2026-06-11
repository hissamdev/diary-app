import { ArrowRight, Edit } from "lucide-react";
import DiaryHeader from "../../ui/diary-header/DiaryHeader";
import EntryBlocks from "./EntryBlocks";
import { Suspense } from "react";
import CreateDailyEntry from "./CreateDailyEntry";
import { isAuthenticated } from "@/actions/server";
import { redirect } from "next/navigation";
import SignIn from "../../ui/auth/SignIn";

export default async function Entries() {
    const session = await isAuthenticated();

    return (
        <div className="mx-25 max-w-4xl w-full">
            <DiaryHeader />
            <div className="mx-auto w-full flex-1 pt-3">
                <div className="text-black">
                    <h1 className="font-semibold font-maprope text-[60px] leading-15 tracking-[-3px]">
                        How was your day?
                    </h1>
                    <p className="pt-3 text-[18px] text-[#484554] max-w-107">
                        Take a moment to capture your thoughts, feelings, and
                        the small magic of today.
                    </p>
                </div>
                <div className="mt-8 flex justify-between">
                    <h2 className="font-manrope font-semibold text-3xl text-black">
                        Recent Activity
                    </h2>
                    {/* <span className="cursor-pointer self-end rounded border border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                        Filter
                    </span> */}
                    <span className="cursor-pointer self-end rounded font-semibold text-[#4F46E5]">
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
