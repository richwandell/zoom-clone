import {remotePeerAnswered, remotePeerOffered, setRemotePeerVideoStream} from "../../actions/AppActions";
import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext";

export default function usePeerConnection() {
    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        if (state.remote_peers.length === 0) return;

        for (let i = 0; i < state.remote_peers.length; i++) {
            const remote = state.remote_peers[i];
            const local = state.local_peers[i];

            local.peer.on('signal', (offer) => {
                state.socket.emit('join-meeting-offer', state.meeting_id, local.id, offer);
            });

            remote.peer.on('stream', (stream) => {
                dispatch(setRemotePeerVideoStream(remote.id, stream))
            })

            remote.peer.on('close', () => {
                console.log("remote peer close")
            })

            remote.peer.on('error', (err) => {
                console.error(err)
            })
        }
    }, [state.remote_peers.length])

}