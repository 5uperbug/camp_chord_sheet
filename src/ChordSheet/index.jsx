import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Line from "./Line";
import { getLineType } from "./Line/lineOps"

class ChordSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        };

        this.previousLineType = null;
    }

    componentDidMount() {
        fetch(`./_data/${this.props.filename}`)
            .then(res => res.text())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    renderLines(data) {
        const lines = data.split('\n');
        return lines.map((line, index) => {
            const lineType = getLineType(lines[index]);
            return <Line
                text={line}
                key={index}
                lineType={lineType}
                transposeOffset={this.props.transposeOffset}
            />;
        });

    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <div>Error: {error.message}</div>
                        </Col>
                    </Row>
                </Container>
            );
        } else if (!isLoaded) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <div>
                                Loading...
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <div
                                style={{ whiteSpace: 'pre-wrap', fontSize: this.props.fontSize }}
                                className="font-monospace"
                            >
                                {this.renderLines(data)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default ChordSheet;