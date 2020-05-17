import React, {useContext, useEffect} from 'react';
import '../../../scss/App.scss';
import PresentationApp from "../presentation/App";
import {AppContext} from "../Context";
import connectEffect from "./effects/connectEffect";
import localPeerEffect from "./effects/localPeerEffect";
import remotePeerEffect from "./effects/remotePeerEffect";

export default function App() {

    const {state, dispatch} = useContext(AppContext);



    useEffect(() => connectEffect(state, dispatch), [state.server_connected]);
    useEffect(() => remotePeerEffect(state, dispatch), [state.local_peer]);
    useEffect(() => localPeerEffect(state, dispatch), [state.server_connected, state.meeting_id, state.user_video_stream]);

    return (
        <PresentationApp {...{
            ...state
        }} />
    )
}

