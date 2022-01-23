import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";

import ChordSheet from "../ChordSheet";

const SongIndex = ({ list }) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [show, setShow] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showSong = (song) => {
        setSelectedSong(song);
        handleShow();
    }

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
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h3>Camp Song Index</h3>
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
                        <Modal.Body>
                            {selectedSong && <ChordSheet filename={selectedSong.filename} fontSize={fontSize} />}
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-dark" onClick={() => setFontSize(fontSize - 1)}>-</button>
                                <button type="button" className="btn btn-dark" style={{ pointerEvents: 'none' }}>FONT</button>
                                <button type="button" className="btn btn-dark" onClick={() => setFontSize(fontSize + 1)}>+</button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default SongIndex;