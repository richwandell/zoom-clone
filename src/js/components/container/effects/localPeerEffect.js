import SimplePeer from "simple-peer";
import {setLocalPeer} from "../../../actions/AppActions";

export default function localPeerEffect(state, dispatch) {
    if (state.user_video_stream === null) return;
    if (!state.server_connected) return;
    if (state.meeting_id === '') return;

    const localPeer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: state.user_video_stream
    });

    localPeer.on('signal', (data) => {
        if (typeof data.type !== "undefined" && data.type === "offer") {
            state.socket.emit('join-meeting-offer', state.meeting_id, data);
        } else {
            console.log("local peer", data)
        }
    });

    dispatch(setLocalPeer(localPeer))
}