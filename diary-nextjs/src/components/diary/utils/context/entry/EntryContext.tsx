"use client";

import { createContext, useContext, useState } from "react";

type EntryProps = {
    id: number | null;
    setId: (id: number | null) => void;
};

const EntryContext = createContext<EntryProps | null>(null);

const EntryContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [id, setId] = useState<number | null>(null);

    return (
        <EntryContext.Provider value={{ id, setId }}>
            {children}
        </EntryContext.Provider>
    );
};

const useEntryContext = () => {
    return useContext(EntryContext);
};

export { EntryContextProvider, useEntryContext };
