export type ApiResponse = {
    success: boolean;
    message: string;
    error: unknown;
    data: {
        userId: string;
        id: number;
        createdAt: string;
        lastUpdated: string;
        // If properties are unmodified, we will set properties based on tags later inserted.
        isPropertyModified: boolean;
        blocks: {
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
            children?: any[];
            position: number;
        };
    }[];
};

export type EntryDTO = ApiResponse["data"][0];

export type EntriesDateConverted = Omit<ApiResponse>;
