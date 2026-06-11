import {
    DefaultReactSuggestionItem,
    SuggestionMenuProps,
} from "@blocknote/react";

export default function CustomSuggestion(
    props: SuggestionMenuProps<DefaultReactSuggestionItem>,
) {
    return (
        <dialog className={"slash-menu"}>
            {props.items.map((item, index) => (
                <div
                    className={`slash-menu-item ${
                        props.selectedIndex === index ? "selected" : ""
                    }`}
                    onClick={() => {
                        props.onItemClick?.(item);
                    }}
                >
                    {item.title}
                </div>
            ))}
        </dialog>
    );
}
