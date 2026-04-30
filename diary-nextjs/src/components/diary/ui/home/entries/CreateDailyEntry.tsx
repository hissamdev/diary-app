"use client";

import { ArrowRight } from "lucide-react";

export default function CreateDailyEntry() {
    const handleCreate = async () => {
        const res = await fetch("/api/entries/create", {
            method: "POST",
        });

        if (res.status) {
            console.log("Entry created successfully");
        }
    };

    return (
        <button
            onClick={handleCreate}
            className="mt-5 w-full flex cursor-pointer items-center justify-between rounded-xl text-left bg-indigo-600 hover:bg-indigo-600/95 transition-all p-6 group"
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
