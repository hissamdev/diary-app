"use client";

import EditSidebar from "@/components/diary/ui/edit/EditSidebar";
import { DynamicEditor } from "@/components/diary/utils/blocknote/DynamicEditor";
import { useState } from "react";

export default function Write() {
    const [saving, setSaving] = useState<boolean>(false);

    return (
        <section className="bg-[#1e1e1e] min-h-screen flex">
            <EditSidebar />
            <div className="w-full">
                <div className="max-w-7xl w-full mx-auto py-4 flex justify-end items-center text-sm font-inter">
                    <div className="w-12">
                        {saving ? (
                            <p className="text-gray-400">Saving...</p>
                        ) : (
                            <p className="text-gray-400 font-inter">Saved</p>
                        )}
                    </div>
                </div>
                <div className="mx-auto mt-16 max-w-7xl w-full ">
                    <DynamicEditor setSaving={setSaving} />
                </div>
            </div>
        </section>
    );
}
