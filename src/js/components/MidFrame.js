import {Col, Row} from "react-flexbox-grid";
import React, {useContext} from "react";
import UserVideo from "./UserVideo";
import PeerVideo from "./PeerVideo";
import {AppContext} from "./context/AppContext";
import Styles from "../../scss/modules/mid-frame.module.scss"

function chunk(arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

export default function MidFrame(props) {
    const {state, dispatch} = useContext(AppContext);

    let videos = [];
    if (state.remote_peers.length === 0){
        videos.push(<UserVideo key={0} {...props} />)
    }

    videos = videos.concat(state.remote_peers.map((peer, i) =>
        <PeerVideo
            key={i + 1}
            localPeer={state.local_peers[i]}
            remotePeer={peer}
            videoStream={peer.videoStream}/>
    ));
    let chunkSize = 0;
    if (videos.length <= 3) {
        chunkSize = 3;
    } else if (videos.length === 4) {
        chunkSize = 2;
    } else if (videos.length > 4) {
        chunkSize = 3;
    }
    const chunks = chunk(videos, chunkSize);
    const rowStyle = {
        height: Math.round(100 / chunks.length) + "%"
    }

    return (
        <div className={Styles.midFrameContainer}>
            {state.remote_peers.length > 0 && <UserVideo key={0} {...props} />}
            <div className={Styles.midFrame}>
                {chunks.map((c, i) =>
                    <Row
                        style={rowStyle}
                        key={i}
                        className={Styles.videoRow}>{c.map((v, i) =>
                            <Col
                                className={Styles.colXS}
                                xs key={i}>{v}</Col>)}
                    </Row>
                )}
            </div>
        </div>
    )
}