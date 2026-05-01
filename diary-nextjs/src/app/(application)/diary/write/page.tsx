import EditSidebar from "@/components/diary/ui/edit/EditSidebar";
import DiaryEditor from "@/components/diary/ui/edit/DiaryEditor";
import { Suspense } from "react";
import { isAuthenticated } from "@/actions/server";
import { redirect } from "next/navigation";

export default async function Write() {
    const session = await isAuthenticated();
    if (session) return redirect("/");

    return (
        <section className="bg-[#1e1e1e] min-h-screen flex">
            <EditSidebar />
            <div className="w-full">
                {!session ? (
                    <Suspense>
                        <DiaryEditor />
                    </Suspense>
                ) : (
                    <div>Not authenticated</div>
                )}
            </div>
        </section>
    );
}
