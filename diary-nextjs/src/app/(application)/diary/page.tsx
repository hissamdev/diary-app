import DiarySidebar from "@/components/diary/ui/home/DiarySidebar";
import DiarySidebarRight from "@/components/diary/ui/home/DiarySidebarRight";
import Entries from "@/components/diary/ui/home/entries/Entries";

export default function Home() {
    return (
        <section className="bg-white flex">
            <DiarySidebar />
            <Entries />
            <DiarySidebarRight />
        </section>
    );
}
