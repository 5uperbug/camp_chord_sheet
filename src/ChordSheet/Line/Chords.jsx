import React from "react";

const Chords = ({ line }) => {
    const displayText = line.replaceAll('{', '').replaceAll('}', '');
    return (
        <div
            className="chords text-danger"
            dangerouslySetInnerHTML={{ __html: displayText }}>
        </div>
    );
}

export default Chords;