"use client";

import { ApiResponse } from "@/types/apis";
import { authClient } from "@/utils/auth-client";
import { compareDate } from "@/utils/functions/compareDate";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type LastEntryDate = ApiResponse & {
    data: {
        createdAt: string;
    };
};

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
    };

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/entries/first`,
                );
                if (!res.ok) {
                    console.error(res.status, res.statusText);
                }
                const json: LastEntryDate = await res.json();
                if (!json.success) {
                    console.error(json.message, json.error);
                }
                const lastEntryDate = new Date(
                    json.data?.createdAt,
                ).toDateString();
                const entryExists = compareDate(lastEntryDate); // Check if last entry was today
                setExists(entryExists);
            } catch (e) {
                console.error(e);
            }
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
