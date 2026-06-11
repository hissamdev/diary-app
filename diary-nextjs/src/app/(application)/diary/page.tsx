import DiarySidebar from "@/components/diary/diary-entries/DiarySidebar";
import DiarySidebarRight from "@/components/diary/diary-entries/DiarySidebarRight";
import Entries from "@/components/diary/diary-entries/Entries";

export default function Home() {
    return (
        <section className="bg-white flex">
            <DiarySidebar />
            <Entries />
            <DiarySidebarRight />
        </section>
    );
}
