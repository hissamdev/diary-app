"use client";

import {
    DefaultReactSuggestionItem,
    SuggestionMenuController,
    SuggestionMenuProps,
    useCreateBlockNote,
} from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
//@ts-ignore
import "@blocknote/mantine/style.css";
// Include the included Inter font
//@ts-ignore
import "@blocknote/core/fonts/inter.css";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/apis";
import { BlockNoteSchema, defaultInlineContentSpecs } from "@blocknote/core";
import { Tag } from "./Tags";

type Props = {
    entryId: number;
    data: any[];
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CustomSuggestion(
    props: SuggestionMenuProps<DefaultReactSuggestionItem>,
) {
    return (
        <div className={"slash-menu bg-white text-black p-4 rounded-lg"}>
            <span className="inline-block mb-2 text-lg text-gray-700 font-semibold">
                Group Name
            </span>
            {props.items.map((item, index) => (
                <div
                    key={index}
                    className={`slash-menu-item py-2 px-4 min-w-sm text-sm border-t border-t-black/10 hover:bg-black/10 last:border-b last:border-b-black/10 cursor-pointer ${
                        props.selectedIndex === index ? "selected" : ""
                    }`}
                    onClick={() => {
                        props.onItemClick?.(item);
                    }}
                >
                    {item.title}
                </div>
            ))}
        </div>
    );
}

export default function DiaryInitialization({
    entryId,
    data,
    setSaving,
}: Props) {
    const timer = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const handleSave = async () => {
        if (timer.current) clearTimeout(timer.current);

        const currentData = editor.document;
        if (currentData.length === 0 || currentData?.[0]?.id === null) return;
        if (!entryId) {
            router.push("/diary");
            return;
        }
        setSaving(true);
        timer.current = setTimeout(async () => {
            try {
                const res = await fetch("/api/blocks/update", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        doc: currentData,
                        entryId,
                    }),
                });
                if (!res.ok) {
                    console.error("HTTP Error: ", res.status);
                }
                const json: ApiResponse = await res.json();
                if (!json.success) {
                    console.error(json.message, json.error);
                }
            } catch (err) {
                console.error(err);
            }

            setSaving(false);
        }, 1000);
    };

    if (!data || data.length === 0) {
        console.error("Invalid data: ", data);
        return;
    }

    const schema = BlockNoteSchema.create({
        inlineContentSpecs: {
            ...defaultInlineContentSpecs,
            tags: Tag,
        },
    });

    const editor = useCreateBlockNote({
        schema,
        initialContent: data,
    });

    const darkTheme = {
        colors: {
            editor: {
                text: "#FFFFFFAA",
                background: "#1e1e1e",
            },
        },
    };

    return (
        <>
            <BlockNoteView
                editor={editor}
                onChange={handleSave}
                className="[&>.bn-editor]:min-h-120 w-full"
                theme={{
                    light: darkTheme,
                    dark: darkTheme,
                }}
            >
                <SuggestionMenuController
                    triggerCharacter={"#"} // Triggers when the user types #
                    suggestionMenuComponent={CustomSuggestion}
                    getItems={async (query) => {
                        // Mock list of tags to select from
                        const availableTags = [
                            "urgent",
                            "marketing",
                            "bug-fix",
                            "feature",
                        ];

                        return availableTags
                            .filter((tag) =>
                                tag.toLowerCase().includes(query.toLowerCase()),
                            )
                            .map((tag) => ({
                                title: tag,
                                onItemClick: () => {
                                    // 1. Insert your custom inline block
                                    editor.insertInlineContent([
                                        {
                                            type: "tags",
                                            props: { tag: tag }, // Sets your propSchema tag state
                                            // content: [], // REQUIRED because content is "styled"
                                        },
                                        // {
                                        //     type: "text",
                                        //     text: " ", // Convenience: adds a space after inserting so the user can keep typing outside the tag
                                        //     styles: {},
                                        // },
                                    ]);
                                },
                            }));
                    }}
                />
            </BlockNoteView>
        </>
    );
}
