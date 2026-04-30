import { createEntry } from "@/actions/actions";
import { ArrowRight } from "lucide-react";

export default function CreateDailyEntry() {
    return (
        <button
            onClick={createEntry}
            className="mt-5 w-full flex cursor-pointer items-center justify-between rounded-xl text-left bg-indigo-600 hover:bg-indigo-600/95 transition-all p-6 group"
        >
            <div className="">
                <h3 className="">Today, 10 Apr</h3>
                <p>How was your day?</p>
            </div>
            <div className="flex aspect-square items-center rounded-full bg-white/20">
                <ArrowRight className="w-12" />
            </div>
        </button>
    );
}
