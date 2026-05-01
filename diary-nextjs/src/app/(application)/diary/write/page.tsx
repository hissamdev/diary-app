import EditSidebar from "@/components/diary/ui/edit/EditSidebar";
import DiaryEditor from "@/components/diary/ui/edit/DiaryEditor";
import { Suspense } from "react";

export default function Write() {
    return (
        <section className="bg-[#1e1e1e] min-h-screen flex">
            <EditSidebar />
            <div className="w-full">
                <Suspense>
                    <DiaryEditor />
                </Suspense>
            </div>
        </section>
    );
}
