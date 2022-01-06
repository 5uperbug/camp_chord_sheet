import React from "react";

const SectionTitle = ({ line }) => {
    const displayText = line.replaceAll('[', '').replaceAll(']', '').trim();
    return <div
        className="section-title text-capitalize h5 mt-5"
        dangerouslySetInnerHTML={{ __html: displayText }}>
    </div>;
}

export default SectionTitle;