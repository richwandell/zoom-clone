import {remotePeerAnswered, setRemotePeerVideoStream} from "../../../actions/AppActions";

export default function peerConnectionEffect(state, dispatch) {
    if (state.remote_peers.length === 0) return;

    for(let i = 0; i < state.remote_peers.length; i++){
        const remote = state.remote_peers[i];
        const local = state.local_peers[i];

        local.localPeer.on('signal', (offer) => {
            state.socket.emit('join-meeting-offer', state.meeting_id, local.id, offer);
        });

        remote.remotePeer.on('signal',  (answer) => {
            state.socket.emit('join-meeting-answer', state.meeting_id, state.server_id, answer);
        });

        remote.remotePeer.on('stream',  (stream) => {
            dispatch(setRemotePeerVideoStream(remote.id, stream))
        })

        remote.remotePeer.on('close', () => {
            console.log("remote peer close")
        })

        remote.remotePeer.on('error', (err) => {
            console.error(err)
        })
    }

    state.socket.on('join-meeting-offer', (data) => {
        const remote = state.remote_peers.find((p) => p.id === data.id);
        remote.remotePeer.signal(data.offer);
    })

    state.socket.on('join-meeting-answer', (response) => {
        if (!(response.answers && response.answers.length > 0)) return;

        for (let answer of response.answers) {
            dispatch(remotePeerAnswered(answer.id, answer.answer));
        }
    })
}