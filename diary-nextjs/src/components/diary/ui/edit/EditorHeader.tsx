export default function EditorHeader({
    saving,
    entryId,
}: {
    saving: boolean;
    entryId: number;
}) {
    return (
        <div className="max-w-7xl px-14 w-full mx-auto py-4 flex justify-between items-center text-sm font-inter">
            <div>
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
