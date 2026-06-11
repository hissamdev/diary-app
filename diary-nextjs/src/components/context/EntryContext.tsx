"use client";

import { EntryRes } from "@/components/diary/diary-entries/EntryBlocks";
import { createContext, useContext, useState } from "react";

type EntryContextType = {
    allEntries: EntryRes["data"];
    setAllEntries: React.Dispatch<React.SetStateAction<EntryRes["data"]>>;
};

const EntryContext = createContext<EntryContextType | null>(null);

const EntryContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [allEntries, setAllEntries] = useState<EntryRes["data"]>([]);

    return (
        <EntryContext.Provider value={{ allEntries, setAllEntries }}>
            {children}
        </EntryContext.Provider>
    );
};

const useEntryContext = () => {
    const ctx = useContext(EntryContext);
    if (!ctx) throw new Error("useEntryContext must be used inside provider");
    return ctx;
};

export { EntryContextProvider, useEntryContext };
