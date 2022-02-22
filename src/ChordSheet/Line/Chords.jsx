import React from "react";

const Chords = ({ line, transposeOffset }) => {
    let displayText;
    const cleanedText = line.replaceAll('{', '').replaceAll('}', '');
    const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    const getTransposedText = (text) => {
        let transposedChords = '';
        let chordBuffer = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (chordBuffer.length && (char === ' ' || i === text.length)) {
                transposedChords += applyTransposeOffset(chordBuffer);
                chordBuffer = '';
            }

            if (char === ' ') {
                transposedChords += char;
            } else {
                chordBuffer += char;
            }
        }
        transposedChords += applyTransposeOffset(chordBuffer);

        return transposedChords;
    };

    /**
     * middleware function to handle slash chords and tranpose each component of a slash chord
     * @param {string} chordBuffer 
     * @returns transposed chord
     */
    const applyTransposeOffset = (chordBuffer) => {
        // take care of slash chords
        if (chordBuffer.includes('/')) {
            const parts = chordBuffer.split('/');
            return `${addOffset(parts[0])}/${addOffset(parts[1])}`;
        }
        return addOffset(chordBuffer);
    };

    /**
     * add the offset to the chord
     * @param {string} chord 
     * @returns transposed chord
     */
    const addOffset = (chord) => {
        let note;
        let chordTail;

        if (chord[1] === '#') {
            note = chord[0] + chord[1];
            chordTail = chord.substr(2);
        } else {
            note = chord[0];
            chordTail = chord.substr(1);
        }
        let index = notes.indexOf(note);
        let newIndex;

        // handle negative offsets in a circular maner
        if ((index + transposeOffset) < 0) {
            newIndex = (index + transposeOffset) + 12;
        } else {
            newIndex = (index + transposeOffset) % 12;
        }

        const newChord = `${notes[newIndex]}${chordTail}`;
        return newChord;
    }

    // don't do anything if there's no transpose offset
    if (transposeOffset !== 0) {
        displayText = getTransposedText(cleanedText);
    } else {
        displayText = cleanedText;
    }

    return (
        <div
            className="chords text-danger"
            style={{ fontSize: '1em' }}
            dangerouslySetInnerHTML={{ __html: displayText }}>
        </div>
    );
}

export default Chords;