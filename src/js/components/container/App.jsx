import React, {useContext, useEffect} from 'react';
import '../../../scss/App.scss';
import PresentationApp from "../presentation/App";
import {AppContext} from "../Context";
import connectEffect from "./effects/connectEffect";
import localPeerEffect from "./effects/localPeerEffect";
import remotePeerEffect from "./effects/remotePeerEffect";
import meetingEffect from "./effects/meetingEffect";
import peerConnectionEffect from "./effects/peerConnectionEffect";

export default function App() {

    const {state, dispatch} = useContext(AppContext);

    useEffect(() => connectEffect(state, dispatch), [state.server_connected]);
    useEffect(() => meetingEffect(state, dispatch), [state.server_connected, state.meeting_id, state.user_video_stream]);
    useEffect(() => peerConnectionEffect(state, dispatch), [state.remote_peers.length])


    // useEffect(() => localPeerEffect(state, dispatch), [state.server_connected, state.meeting_id, state.user_video_stream]);
    // useEffect(() => remotePeerEffect(state, dispatch), [state.local_peer]);

    return (
        <PresentationApp {...{
            ...state
        }} />
    )
}

