import React from "react";

import {
    SECTION_TITLE,
    PAGE_TITLE,
    CHORDS,
    BLOCKQUOTES,
    CODE
} from './lineTypes';

import SectionTitle from "./SectionTitle";
import PageTitle from "./PageTitle";
import Chords from "./Chords";
import Blockquotes from "./blockquotes";
import Code from "./Code";

const Line = ({ text, lineType }) => {
    const printLine = (line) => {
        switch (lineType) {
            case SECTION_TITLE:
                return <SectionTitle line={line} />;
            case PAGE_TITLE:
                return <PageTitle line={line} />;
            case CHORDS:
                return <Chords line={line} />;
            case BLOCKQUOTES:
                return <Blockquotes line={line} />;
            case CODE:
                return <Code line={line} />;

            default:
                return <div dangerouslySetInnerHTML={{ __html: line }} style={{ fontSize: '1em' }}></div>;

        }
    };

    return printLine(text);
};

export default Line;