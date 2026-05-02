export default function DiaryHeader() {
    return (
        <header>
            <div className="py-10 text-black flex items-center">
                <ul className="inline-flex gap-6 font-manrope">
                    <li className="font-semibold cursor-pointer transition-all hover:text-purple-600 hover:-translate-y-0.5 border-b border-transparent hover:border-b hover:border-b-purple-600">
                        Diary Entries
                    </li>
                    <li>Notes</li>
                    <li>Milestones</li>
                </ul>
            </div>
        </header>
    );
}
