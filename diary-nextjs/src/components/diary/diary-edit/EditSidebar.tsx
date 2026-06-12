"use client";
import Link from "next/link";
import React from "react";
import { Entry } from "@/types/apis";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    allEntries: Entry[];
};

export default function EditSidebar({ open, setOpen, allEntries }: Props) {
    return (
        <aside
            onClick={() => setOpen(!open)}
            className={`fixed ${open ? "-translate-x-full" : "translate-x-0"} transition-all duration-400 md:translate-x-0 md:max-w-70 w-full h-screen md:sticky top-0  z-10`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#2F2F2F] max-w-70 w-full h-full z-20"
            >
                <div className="px-2">
                    <div className=" border-b border-gray-600">
                        <div className="block px-3 py-5 text-lg text-gray-300 font-medium tracking-wider  uppercase">
                            <Link
                                href="/diary"
                                className="hover:tracking-[4px] transition-all duration-100"
                            >
                                Diary App
                            </Link>
                        </div>
                    </div>
                    <div>
                        {allEntries.map((entry) => (
                            <div key={entry.id}>
                                {entry?.blocks?.[0]?.content?.[0]?.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
