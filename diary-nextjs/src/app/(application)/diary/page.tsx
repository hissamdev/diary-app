import DiarySidebar from "@/components/diary/diary-entries/DiarySidebar";
import DiarySidebarRight from "@/components/diary/diary-entries/DiarySidebarRight";
import DiaryHome from "@/components/diary/diary-entries/main/DiaryHome";

export default function Home() {
    return (
        <section className="bg-white flex">
            <DiarySidebar />
            <DiaryHome />
            <DiarySidebarRight />
        </section>
    );
}
