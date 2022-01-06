import React from "react";

const Blockquotes = ({ line }) => {
    const displayText = line.replace('>', '').trim();
    return (
        <blockquote
            className="blockquote bg-secondary text-white px-2 py-1 m-0"
            style={{ fontSize: '0.9rem' }}
            dangerouslySetInnerHTML={{ __html: displayText }}>
        </blockquote>
    );
}

export default Blockquotes;