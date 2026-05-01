"use client";

import { authClient } from "@/utils/auth-client";
import { ArrowRight } from "lucide-react";

export default function CreateDailyEntry() {
    const {
        data: session,
        isPending,
        error,
        refetch,
    } = authClient.useSession();

    const handleCreate = async () => {
        const res = await fetch("/api/entries/create", {
            method: "POST",
            body: JSON.stringify({ userId: session?.user.id }),
        });

        const parsed = (await res.json()) as { success: boolean };

        if (parsed.success) {
            console.log("Entry created successfully");
        }
    };

    return (
        <button
            disabled={!session}
            onClick={handleCreate}
            className="mt-5 w-full flex cursor-pointer items-center justify-between rounded-xl disabled:cursor-not-allowed text-left disabled:bg-indigo-600 bg-indigo-600 hover:bg-indigo-600/95 transition-all p-6 group"
        >
            <div className="">
                <h3 className="">Today, 10 Apr</h3>
                <p>How was your day?</p>
            </div>
            <div className="flex aspect-square items-center rounded-full bg-white/20">
                <ArrowRight className="w-12" />
            </div>
        </button>
    );
}
