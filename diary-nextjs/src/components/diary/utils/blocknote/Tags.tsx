import { createReactInlineContentSpec } from "@blocknote/react";

export const Tag = createReactInlineContentSpec(
    {
        type: "tags",
        propSchema: {
            tag: { default: "tag" },
        },
        content: "styled",
    } as const,
    {
        render: (props) => (
            <span style={{ backgroundColor: "black" }}>
                #{props.inlineContent.props.tag}
            </span>
        ),
    },
);
