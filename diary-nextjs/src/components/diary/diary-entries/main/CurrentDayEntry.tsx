import { exampleBlocks } from "@/components/misc/exampleData";

export default function CurrentDayEntry() {
    return (
        <div className="mt-4">
            <div className="pb-1 flex justify-between items-end border-b border-black/25">
                <h2 className="font-manrope font-semibold text-3xl text-black">
                    Today's Entry
                </h2>

                <span className="text-black">Edit</span>
            </div>

            <div className="mt-4">
                {exampleBlocks.map((block) => (
                    <p
                        key={block.id}
                        className="text-black text-[17px] font-manrope"
                    >
                        {block?.content?.[0]?.text}
                    </p>
                ))}
            </div>
        </div>
    );
}
