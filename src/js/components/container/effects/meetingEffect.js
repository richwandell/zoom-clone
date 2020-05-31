import {setPeerConnections} from "../../../actions/AppActions";
import SimplePeer from "simple-peer";

export default function meetingEffect(state, dispatch) {
    if (!state.server_connected) return;
    if (state.user_video_stream === null) return;
    if (state.meeting_id === '') return;

    state.socket.on('join-meeting', (data) => {
        const peerConnections = [];
        for(let participant of data.participants) {
            if (participant === state.server_id) continue;
            const existingLocalPeer = state.local_peers.find((p) => p.id === participant);
            const existingRemotePeer = state.remote_peers.find((p) => p.id === participant);
            if (existingLocalPeer !== undefined || existingRemotePeer !== undefined) continue;

            const localPeer = new SimplePeer({
                initiator: true,
                trickle: false,
                stream: state.user_video_stream
            });

            const remotePeer = new SimplePeer({
                initiator: false,
                trickle: false
            });

            peerConnections.push([{
                id: participant,
                localPeer
            }, {
                id: participant,
                remotePeer,
                answer: null,
                videoStream: null,
                videoElement: null,
                has_video_stream: false
            }])
        }

        dispatch(setPeerConnections(peerConnections))
    });

    state.socket.emit('join-meeting', state.meeting_id);
}