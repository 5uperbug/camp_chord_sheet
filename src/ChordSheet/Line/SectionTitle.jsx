import React from "react";

const SectionTitle = ({ line }) => {
    const displayText = line.replaceAll('[', '').replaceAll(']', '').trim();
    return <div
        className="section-title text-capitalize h5 mt-5"
        style={{ fontSize: '1.25em' }}
        dangerouslySetInnerHTML={{ __html: displayText }}>
    </div>;
}

export default SectionTitle;