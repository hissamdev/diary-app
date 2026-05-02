"use client";

import {
    Hamburger,
    HamburgerIcon,
    LineSquiggle,
    LucideHamburger,
    Menu,
} from "lucide-react";

type Props = {
    saving: boolean;
    entryId: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditorHeader({ saving, entryId, setOpen }: Props) {
    return (
        <div className="max-w-7xl px-4 md:px-14 w-full mx-auto py-6 flex justify-between items-center text-sm font-inter">
            <div className="flex items-center gap-4">
                <div onClick={() => setOpen(!open)} className="block md:hidden">
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
