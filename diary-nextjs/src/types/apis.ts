export type ApiResponse = {
    success: boolean;
    message: string;
    error: unknown;
};

export type ApiWithEntries = ApiResponse & {
    data: Entry[];
};

export type Entry = {
    userId: string;
    id: number;
    createdAt: string;
    lastUpdated: string;
    // If properties are unmodified, we will set properties based on tags later inserted.
    isPropertyModified: boolean;
    blocks: Block[];
};

export type Block = {
    primaryKey: number;
    entryId: number;
    id: string;
    type: string;
    props: {
        backgroundColor: string;
        textColor: string;
        textAlignment: string;
        level: number;
        isToggleable: boolean;
    };
    content: any[];
    children: any[];
    position: number;
};

// DB Entries have the createdAt and lastUpdated set to Date instead of string
// And the content column set to json

export type DBEntry = Omit<Entry, "createdAt" | "lastUpdated" | "blocks"> & {
    createdAt: Date;
    lastUpdated: Date;
    blocks: DBBlock[];
};

export type DBBlock = Omit<Block, "content"> & {
    content: {
        encryptedData: string;
        iv: string;
    };
};

//
