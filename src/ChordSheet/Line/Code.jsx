import React from "react";

const Code = ({ line }) => {
    const displayText = line.replaceAll('`', '');

    return (
        <div className="my-2">
            <code className="text-info border border-info p-2">
                {displayText}
            </code>
        </div>
    );
};

export default Code;