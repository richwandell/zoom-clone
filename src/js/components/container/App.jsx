import React, {useContext, useEffect} from 'react';
import '../../../scss/App.scss';
import PresentationApp from "../presentation/App";
import SimplePeer from "simple-peer";
import {AppContext} from "../Context";
import io from 'socket.io-client';
import {serverConnected, setLocalPeer, setMeetingId, setPeers, setRemotePeers} from "../../actions/AppActions";

export default function App() {

    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        if (state.server_connected) return;
        const location = window.location.port === "3000" ? "http://localhost:3001" : window.location.host;
        const socket = io(location, {
            path: '/video'
        });

        socket.on('connect', () => {
            dispatch(serverConnected(socket))
        });
    }, [state.server_connected]);

    useEffect(() => {
        if (state.user_video_stream === null) return;
        if (!state.server_connected) return;
        if (state.meeting_id === '') return;

        const localPeer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: state.user_video_stream
        });

        dispatch(setLocalPeer(localPeer))

    }, [state.server_connected, state.meeting_id, state.user_video_stream]);

    useEffect(() => {
        if (state.local_peer === null || state.remote_peer === null) return;

        state.local_peer.on('signal', (data) => {
            if (typeof data.type !== "undefined" && data.type === "offer") {
                state.socket.emit('join-meeting-offer', state.meeting_id, data);
            } else {
                console.log("local peer", data)
            }
        });

        state.socket.on('peers-joined', (response) => {
            if (!(response.offers && response.offers.length > 0)) return;

            const remotePeers = {};
            for(let offer of response.offers) {
                const id = offer.id;
                if (typeof state.remote_peers[id] !== "undefined") continue;

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
                    if (state.peer_video_element.srcObject !== stream) {
                        state.peer_video_element.srcObject = stream;
                    }
                })

                remotePeer.signal(offer.offer)

                remotePeers[id] = remotePeer;
            }

            dispatch(setRemotePeers(remotePeers))
        });

        let signaled = false;
        state.socket.on('peers-joined-answers', (response) => {
            if (!(response.answers && response.answers.length > 0)) return;

            if (!signaled) {
                signaled = true;
                console.log("signaling local peer")
                state.local_peer.signal(response.answers[0].answer);
            }
        })

    }, [state.local_peer])

    return (
        <PresentationApp {...{
            ...state,
            submitMeeting: (meetingId) => dispatch(setMeetingId(meetingId))
        }} />
    )
}

