import DiarySidebar from "./DiarySidebar";
import DiarySidebarRight from "./DiarySidebarRight";
import Entries from "./Entries";

export default function DiaryHome() {
    return (
        <section className="bg-white flex">
            <DiarySidebar />
            <Entries />
            <DiarySidebarRight />
        </section>
    );
}
