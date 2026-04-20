import { Book, BookAlert, Tag } from "lucide-react";

export default function DiarySidebar() {
    return (
        <aside className="w-70 h-full border-r border-gray-400 text-black px-4 pt-20">
            <div className="flex flex-col gap-4">
                <div className="text-[#5D3FD3] text-sm font-semibold px-10 py-2 bg-[#5D3FD3]/10 hover:bg-[#5D3FD3]/15 cursor-pointer rounded-r-full flex items-center gap-2">
                    <Book className="w-4" />
                    Properties
                </div>

                <div className="text-[#5D3FD3] text-sm font-semibold px-10 py-2 bg-[#5D3FD3]/10 hover:bg-[#5D3FD3]/15 cursor-pointer rounded-r-full flex items-center gap-2">
                    <Tag className="w-4" />
                    Tags
                </div>
            </div>
        </aside>
    );
}
