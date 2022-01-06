import {
    SECTION_TITLE,
    PAGE_TITLE,
    CHORDS,
    LYRICS,
    BLOCKQUOTES,
    CODE
} from './lineTypes';

export const getCharCount = (line) => {
    let spaceCount = 0;
    let otherCount = 0;

    for (const c of line || '') {
        if (c === ' ') {
            spaceCount++;
        } else {
            otherCount++;
        }
    }

    return {
        spaces: spaceCount,
        others: otherCount,
        length: line.length
    };
};

export const getLineType = (line) => {
    const sectionTitle = /^\[.*\]$/;
    const pagetitle = /^#.*/;
    const chords = /^\{.*\}$/;
    const blockquotes = /^>.*/;
    const code = /^`.*`$/;

    if (!line) {
        return;
    }

    if (sectionTitle.test(line)) {
        return SECTION_TITLE;
    }

    if (pagetitle.test(line)) {
        return PAGE_TITLE;
    }

    if (blockquotes.test(line)) {
        return BLOCKQUOTES;
    }

    if (code.test(line)) {
        return CODE;
    }

    const count = getCharCount(line);
    if (chords.test(line) || (count.length > 0 && count.spaces > count.others)) {
        return CHORDS;
    }

    return LYRICS;
}