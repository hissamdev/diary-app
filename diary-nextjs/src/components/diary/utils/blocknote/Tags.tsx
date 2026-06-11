import { createReactInlineContentSpec } from "@blocknote/react";

export const Tags = createReactInlineContentSpec(
    {
        type: "tag",
        propSchema: {
            path: {
                default: [] as string[],
            },
        },
        content: "styled",
    } as const,
    {
        render: (props) => (
            <span style={{ backgroundColor: "black" }}>
                @{props.inlineContent.props.tag}
            </span>
        ),
    },
);
