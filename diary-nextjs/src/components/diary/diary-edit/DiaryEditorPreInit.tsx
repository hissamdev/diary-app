"use client";
import { Block } from "@/types/apis";
// This component exists to delay calling the initilization component, as we're delaying hook orders here, and having it in this file would bring hook order issues.
import { DynamicEditor } from "../blocknote/DynamicEditor";

type Props = {
    entryId: number;
    setEntryId?: React.Dispatch<React.SetStateAction<number>>;
    data: Block[] | null;
    setData?: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function DiaryEditorPreInit({ entryId, data }: Props) {
    if (!Array.isArray(data) || !data || data?.length === 0) {
        return <div></div>;
    }

    return (
        <div>
            <div className="max-w-7xl w-full ">
                <DynamicEditor
                    entryId={entryId}
                    // @ts-ignore
                    data={data}
                />
            </div>
        </div>
    );
}
