export default function DiaryHeader() {
    return (
        <header>
            <div className="container mx-auto text-black h-15 flex items-center px-50">
                <ul className="inline-flex gap-6 text-sm">
                    <li className="font-[550] font-semi cursor-pointer transition-all hover:text-purple-600 hover:-translate-y-0.5 hover:border-b hover:border-b-purple-600">
                        Diary Entries
                    </li>
                    <li>Milestones</li>
                    <li>Diary Entries</li>
                </ul>
            </div>
        </header>
    );
}
