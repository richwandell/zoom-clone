import {Col, Row} from "react-flexbox-grid";
import React, {useContext} from "react";
import UserVideo from "./UserVideo";
import PeerVideo from "./PeerVideo";
import {AppContext} from "../context/AppContext";

export default function MidFrame(props) {
    const {state, dispatch} = useContext(AppContext);
    let colWidth = 6;
    if (state.remote_peers.length > 1) {
        colWidth = 4;
    }
    return (
        <div id={"mid-frame"}>
            <Col xs={colWidth}>
                <UserVideo {...props} />
            </Col>
            {state.remote_peers.map((peer, i) =>
                <Col xs={colWidth} key={i}>
                    <PeerVideo
                        localPeer={state.local_peers[i]}
                        remotePeer={peer}
                        videoStream={peer.videoStream} />
                </Col>
            )}
        </div>
    )
}