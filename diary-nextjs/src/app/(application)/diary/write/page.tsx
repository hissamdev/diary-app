import { Suspense } from "react";
import { isAuthenticated } from "@/actions/server";
import { redirect } from "next/navigation";
import DiaryEdit from "@/components/diary/ui/home/edit/DiaryEdit";

export default async function Write() {
    const session = await isAuthenticated();
    if (!session) return redirect("/diary");

    return (
        <section className="bg-[#1e1e1e] min-h-screen">
            <div className="w-full">
                {session ? (
                    <Suspense>
                        <DiaryEdit />
                    </Suspense>
                ) : (
                    <div>Not authenticated</div>
                )}
            </div>
        </section>
    );
}
