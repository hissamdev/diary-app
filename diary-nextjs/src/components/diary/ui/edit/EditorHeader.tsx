import {
    Hamburger,
    HamburgerIcon,
    LineSquiggle,
    LucideHamburger,
    Menu,
} from "lucide-react";

export default function EditorHeader({
    saving,
    entryId,
}: {
    saving: boolean;
    entryId: number;
}) {
    return (
        <div className="max-w-7xl px-4 md:px-14 w-full mx-auto py-4 flex justify-between items-center text-sm font-inter">
            <div className="flex items-center gap-4">
                <div>
                    <Menu className="w-8 text-gray-400" />
                </div>
                <p>Entry Id: {entryId}</p>
            </div>
            <div className="w-12">
                {saving ? (
                    <p className="text-gray-400">Saving...</p>
                ) : (
                    <p className="text-gray-400 font-inter">Saved</p>
                )}
            </div>
        </div>
    );
}
