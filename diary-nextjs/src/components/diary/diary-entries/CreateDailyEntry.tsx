"use client";

import { ApiResponse } from "@/types/apis";
import { authClient } from "@/utils/auth-client";
import { compareDate } from "@/utils/functions/compareDate";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { EntryData, EntryRes } from "./EntryBlocks";

export default function CreateDailyEntry() {
    const [exists, setExists] = useState(true);
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

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/entries/first", {
                method: "GET",
            });
            if (!res.ok) return console.error(res.status);
            const json: EntryData = await res.json();
            const latestEntry = new Date(json.data?.createdAt).toDateString();
            const entryExists = compareDate(latestEntry);
            setExists(entryExists);
        };
        load();
    }, []);

    return (
        <button
            disabled={!session?.user.id}
            onClick={handleCreate}
            className={`${exists ? "hidden" : "flex"} mt-5 w-full cursor-pointer items-center justify-between rounded-xl disabled:cursor-not-allowed text-left disabled:bg-indigo-600 bg-indigo-600 hover:bg-indigo-600/95 transition-all p-6 group`}
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
