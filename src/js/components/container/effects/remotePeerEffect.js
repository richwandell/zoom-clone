import SimplePeer from "simple-peer";
import {remotePeerAnswered, setRemotePeers, setRemotePeerVideoStream} from "../../../actions/AppActions";

export default function remotePeerEffect(state, dispatch) {
    if (state.local_peer === null) return;

    state.socket.on('peers-joined', (response) => {
        if (!(response.offers && response.offers.length > 0)) return;

        const remotePeers = state.remote_peers;
        for(let offer of response.offers) {
            const id = offer.id;
            const peer = state.remote_peers.find((p) => p.id === id);
            if (peer) continue;

            const remotePeer = new SimplePeer({
                initiator: false,
                trickle: false
            });

            remotePeer.on('signal',  (data) => {
                if (typeof data.type !== "undefined" && data.type === "answer") {
                    state.socket.emit('join-meeting-answer', state.meeting_id, data);
                } else {
                    console.log("remote peer", data)
                }
            });

            remotePeer.on('stream',  (stream) => {
                dispatch(setRemotePeerVideoStream(id, stream))
            })

            remotePeer.on('close', () => {
                console.log("remote peer close")
            })

            remotePeer.on('error', (err) => {
                console.log("remote peer error", err)
            })

            remotePeer.signal(offer.offer)

            remotePeers.push({
                id,
                remotePeer,
                answer: null,
                videoStream: null,
                videoElement: null,
                has_video_stream: false
            });
        }

        dispatch(setRemotePeers(remotePeers))
    });


    state.socket.on('peers-joined-answers', (response) => {
        if (!(response.answers && response.answers.length > 0)) return;

        for (let answer of response.answers) {
            dispatch(remotePeerAnswered(answer.id, answer.answer))
            // try {
            //     state.local_peer.signal(answer.answer);
            // }catch(e) {
            //     console.error(e);
            // }
        }
    })
}