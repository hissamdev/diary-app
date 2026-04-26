import EditSidebar from "@/components/diary/ui/edit/EditSidebar";
import { DynamicEditor } from "@/components/diary/utils/blocknote/DynamicEditor";
import { Suspense } from "react";

export default function Write() {
    return (
        <section className="py-32 bg-[#1e1e1e] min-h-screen">
            <EditSidebar />
            <div className="">
                <div className="mx-auto max-w-4xl">
                    <Suspense
                        fallback={<p className="text-white">Loading...</p>}
                    >
                        <DynamicEditor />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
