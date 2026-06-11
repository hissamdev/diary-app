import { Book, BookAlert, Tag } from "lucide-react";

export default function DiarySidebar() {
    return (
        <aside className="sticky top-0 max-w-87 w-full h-screen border-gray-400 text-black px-8 pt-40">
            <div className="flex flex-col gap-2 font-manrope">
                <div className="text-[#5D3FD3] text-sm font-bold tracking-wide px-5 py-2 bg-[#5D3FD3]/10 hover:bg-[#5D3FD3]/15 cursor-pointer rounded-sm flex items-center gap-2">
                    <Book className="w-4" />
                    Properties
                </div>

                <div className="text-[#696969] text-sm font-bold tracking-wide px-5 py-2 hover:bg-black/5 cursor-pointer rounded-sm flex items-center gap-2">
                    <Tag className="w-4" />
                    Tags
                </div>
            </div>
        </aside>
    );
}
