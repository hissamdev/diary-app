export const definedTags = [
    {
        name: "Memory",
        desc: "Things that are memorable",
        nested: [
            {
                name: "parent",
                desc: "Memories about my parents",
                nested: [
                    {
                        name: "Father",
                        desc: "Memories about my father",
                    },
                    {
                        name: "Mother",
                        desc: "Memories about my mother",
                    },
                ],
            },
            {
                name: "Childhood",
                desc: "Memories about my childhood",
                nested: [
                    {
                        name: "School",
                        desc: "Memories about my school",
                    },
                ],
            },
        ],
    },
    {
        name: "Conv",
        desc: "Conversational",
        nested: [
            {
                name: "Confidence",
                desc: "Note a display of confidence",
                nested: [],
            },
            {
                name: "Personal",
                desc: "Something I would say",
                nested: [
                    {
                        name: "Group",
                        desc: "Something said in groups",
                    },
                ],
            },
        ],
    },
];

const retrievedData = [
    {
        id: "726e5145-bc2d-4343-b6a5-5229f2bad5a0",
        type: "paragraph",
        props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
        },
        content: [{ type: "text", text: "Initial text here", styles: {} }],
        children: [],
    },
    {
        id: "b66e9eda-d02f-4fa9-9487-3b8359f2deeb",
        type: "heading",
        props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
            level: 1,
            isToggleable: false,
        },
        content: [{ type: "text", text: "this is a heading", styles: {} }],
        children: [],
    },
    {
        id: "7ff06d72-2c8d-44d7-94ac-29da4950f6f9",
        type: "bulletListItem",
        props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
        },
        content: [{ type: "text", text: "bullet points be like", styles: {} }],
        children: [
            {
                id: "efd19363-d79b-41d8-b520-9e0dda468e00",
                type: "bulletListItem",
                props: {
                    backgroundColor: "default",
                    textColor: "default",
                    textAlignment: "left",
                },
                content: [
                    {
                        type: "text",
                        text: "sub bullet points be like",
                        styles: {},
                    },
                ],
                children: [],
            },
        ],
    },
    {
        id: "9a4c7181-847e-491a-bc11-0fd71558f672",
        type: "quote",
        props: { backgroundColor: "default", textColor: "default" },
        content: [
            {
                type: "text",
                text: "i guess this one would be a quote",
                styles: {},
            },
        ],
        children: [],
    },
    {
        id: "61a0642b-5d26-4a3f-831b-86291a78496d",
        type: "paragraph",
        props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
        },
        content: [],
        children: [],
    },
];
