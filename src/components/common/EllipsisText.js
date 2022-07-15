import React from "react";

export default function EllipsisText(props) {
    const children = props.children;
    const maxWidth = props.maxWidth;

    return (
        <div style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: `${maxWidth}`
        }}>
            {children}
        </div>
    )
}