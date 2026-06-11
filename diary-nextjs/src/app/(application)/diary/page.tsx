import DiarySidebar from "@/components/diary/ui/home/entries/DiarySidebar";
import DiarySidebarRight from "@/components/diary/ui/home/entries/DiarySidebarRight";
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
