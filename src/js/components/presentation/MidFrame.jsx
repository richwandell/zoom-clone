import {Col, Row} from "react-flexbox-grid";
import React from "react";
import UserVideo from "./UserVideo";
import PeerVideo from "./PeerVideo";

export default function MidFrame(props) {
    return (
        <Row id={"mid-frame"}>
            <Col xs={6}>
                <UserVideo {...props} />
            </Col>
            <Col xs={6}>
                <PeerVideo {...props} />
            </Col>
        </Row>
    )
}