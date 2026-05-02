import CreateDailyEntry from "./entries/CreateDailyEntry";

export default function DiarySidebarRight() {
    return (
        <aside className="w-90 h-full border-l border-gray-400 text-black">
            <CreateDailyEntry />
        </aside>
    );
}
