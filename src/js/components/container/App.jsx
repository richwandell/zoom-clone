import React, {useContext, useEffect} from 'react';
import '../../../scss/App.scss';
import PresentationApp from "../presentation/App";
import SimplePeer from "simple-peer";
import {AppContext} from "../Context";
import io from 'socket.io-client';
import {serverConnected, setConnections, setMeetingId, setUserVideoStream} from "../../actions/AppActions";

export default function App() {

    const {state, dispatch} = useContext(AppContext);

    async function onIceCandidate(name, pc, event) {
        // try {
        //     await(getOtherPc(pc).addIceCandidate(event.candidate));
        //     onAddIceCandidateSuccess(pc);
        // } catch (e) {
        //     onAddIceCandidateError(pc, e);
        // }
        try {
            await state.pc2.addIceCandidate(event.candidate);
        }catch(e) {
            console.error(e);
        }
        console.log(`${name} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
    }

    function onIceStateChange(name, pc, event) {
        if (pc) {
            console.log(`${name} ICE state: ${pc.iceConnectionState}`);
            console.log('ICE state change event: ', event);
        }
    }

    function gotRemoteStream(e) {
        // if (remoteVideo.srcObject !== e.streams[0]) {
        // remoteVideo.srcObject = e.streams[0];
        console.log('pc2 received remote stream');
        // }
    }


    useEffect(() => {
        if (state.server_connected) return;

        const socket = io('http://localhost:3001', {
            path: '/video'
        });

        socket.on('connect', () => {
            dispatch(serverConnected(socket))
        });
    }, [state.server_connected]);

    useEffect(() => {
        if (state.user_video_stream === null) return;
        if (state.meeting_id === '') return;
        if (!state.server_connected) return;

        state.socket.emit('join-meeting', state.meeting_id)

        state.socket.on('join-meeting', (response) => {
            (async () => {

                if (!response.success) {
                    const videoTracks = state.user_video_stream.getVideoTracks();
                    const audioTracks = state.user_video_stream.getAudioTracks();
                    const rtcSessionDescriptionInit = await state.pc1.createOffer({
                        offerToReceiveAudio: 1,
                        offerToReceiveVideo: 1
                    });
                    await state.pc1.setLocalDescription(rtcSessionDescriptionInit);
                    state.pc1.addEventListener('icecandidate', e => onIceCandidate('pc1', state.pc1, e));
                    state.socket.emit('offer', state.meeting_id, rtcSessionDescriptionInit);
                    state.pc1.addEventListener('iceconnectionstatechange', e => onIceStateChange('pc1', state.pc1, e));
                } else {
                    await state.pc2.setRemoteDescription(response.offer);
                    state.pc2.addEventListener('icecandidate', e => onIceCandidate('pc2', state.pc2, e));
                    state.pc2.addEventListener('iceconnectionstatechange', e => onIceStateChange('pc2', state.pc2, e));
                    state.pc2.addEventListener('track', gotRemoteStream);
                }
            })();
        })
    }, [state.server_connected, state.meeting_id, state.user_video_stream]);

    return (
        <PresentationApp {...{
            ...state,
            submitMeeting: (meetingId) => dispatch(setMeetingId(meetingId))
        }} />
    )
}

