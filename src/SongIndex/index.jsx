import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { FaStop, FaPlay } from "react-icons/fa";

import ChordSheet from "../ChordSheet";

const SongIndex = ({ list }) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [show, setShow] = useState(false);
    const [fontSize, setFontSize] = useState(28);
    const [transposeOffset, setTransposeOffset] = useState(0);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(1);
    const [scrollIntervalId, setScrollIntervalId] = useState();
    const lyricWindow = useRef();


    useEffect(() => {
        return () => {
            scrollIntervalId && clearInterval(scrollIntervalId);
        };
    });

    const reset = () => {
        scrollIntervalId && clearInterval(scrollIntervalId);
        setTransposeOffset(0);
        setShow(false);
        setAutoScrollEnabled(false);
        setScrollSpeed(1);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => reset();

    const showSong = (song) => {
        setSelectedSong(song);
        handleShow();
    };

    const renderSongs = (songs) => {
        return songs.map((song, index) => (
            <li
                className="list-group-item text-capitalize"
                style={{ cursor: 'pointer' }}
                onClick={() => showSong(song)}
                key={index}
            >
                {index + 1}. {song.name}
            </li>
        ));
    };

    const handleTranspose = (offset) => {
        setAutoScrollEnabled(false);
        setTransposeOffset(offset % 12);
    };

    const handleAutoScrollClicked = () => {
        let intervalId;

        if (!autoScrollEnabled) {
            setAutoScrollEnabled(true);

            intervalId = setInterval(() => {
                lyricWindow.current.scrollBy(0, 1 * scrollSpeed);
            }, 100);

            setScrollIntervalId(intervalId);
        } else {
            setAutoScrollEnabled(false);
            scrollIntervalId && clearInterval(scrollIntervalId);
        }
    };

    const handleScrollSpeedClicked = (direction) => {
        if (direction === '+') {
            setScrollSpeed(scrollSpeed + 0.2);
        } else if (direction === '-' && scrollSpeed > 0.7) {
            setScrollSpeed(scrollSpeed - 0.2);
        }
    }

    const handleFontSizeClicked = (offset) => {
        setAutoScrollEnabled(false);
        setFontSize(fontSize + offset)
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h3>Song Index</h3>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <ul className="list-group">
                        {renderSongs(list)}
                    </ul>

                    <Modal show={show} onHide={handleClose} fullscreen>
                        <Modal.Header closeButton>
                            <Modal.Title
                                className="text-center text-capitalize w-100"
                            >
                                {selectedSong && selectedSong.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body ref={lyricWindow}>
                            {
                                selectedSong &&
                                <ChordSheet
                                    filename={selectedSong.filename}
                                    fontSize={fontSize}
                                    transposeOffset={transposeOffset}
                                />
                            }
                        </Modal.Body>
                        <Modal.Footer className="justify-content-between">
                            {/* TRANSPOSE CONTROLS */}
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-dark" onClick={() => handleTranspose(transposeOffset - 1)}>-</button>
                                <button type="button" className="btn btn-dark" onDoubleClick={() => handleTranspose(0)}>
                                    TRANSPOSE&nbsp;
                                    {transposeOffset !== 0 && <sup>[{transposeOffset}]</sup>}
                                </button>
                                <button type="button" className="btn btn-dark" onClick={() => handleTranspose(transposeOffset + 1)}>+</button>
                            </div>

                            {/* AUTOSCROLL CONTROLS */}
                            <div className="btn-group" role="group">
                                <button type="button"
                                    className={`btn ${autoScrollEnabled ? 'btn-outline-success' : 'btn-outline-dark'}`}
                                    onClick={() => handleScrollSpeedClicked('-')}
                                    disabled={autoScrollEnabled}
                                >
                                    <span>-</span>
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${autoScrollEnabled ? 'btn-outline-success' : 'btn-outline-dark'}`}
                                    onClick={handleAutoScrollClicked}
                                >
                                    <span className="align-text-bottom">{autoScrollEnabled ? <FaStop /> : <FaPlay />}</span>
                                    <span>&nbsp;Autoscroll&nbsp;</span>
                                    <span><sup>{scrollSpeed.toFixed(1)}x</sup></span>
                                </button>
                                <button type="button"
                                    className={`btn ${autoScrollEnabled ? 'btn-outline-success' : 'btn-outline-dark'}`}
                                    onClick={() => handleScrollSpeedClicked('+')}
                                    disabled={autoScrollEnabled}
                                >
                                    <span>+</span>
                                </button>
                            </div>

                            {/* FONT SIZE CONTROLS */}
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-dark" onClick={() => handleFontSizeClicked(-1)}>-</button>
                                <button type="button" className="btn btn-dark" style={{ pointerEvents: 'none' }}>FONT</button>
                                <button type="button" className="btn btn-dark" onClick={() => handleFontSizeClicked(+1)}>+</button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default SongIndex;