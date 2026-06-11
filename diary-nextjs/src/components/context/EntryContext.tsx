"use client";
import { Entry } from "@/types/apis";
import { createContext, useContext, useState } from "react";

type EntryContextType = {
    allEntries: Entry[];
    setAllEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
};

const EntryContext = createContext<EntryContextType | null>(null);

const EntryContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [allEntries, setAllEntries] = useState<Entry[]>([]);

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
