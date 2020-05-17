import React, {useContext, useEffect} from 'react';
import '../../../scss/App.scss';
import {AppContext} from "../Context";
import {setUserVideo} from "../../actions/AppActions";
import UserVideoPresentation from "../presentation/UserVideo";

export default function UserVideo() {

    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        if (state.user_video_stream !== null) return;
        const video = document.querySelector('#user-video');
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then((stream) => {
            video.srcObject = stream;
            dispatch(setUserVideo(stream, video))
        }).catch((error) => {
            console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
        });
    }, [state.user_video_stream])

    const loading = state.user_video_stream === null;

    return (
        <UserVideoPresentation
            loading={loading}
            user_video_stream={state.user_video_stream}/>
    )
}

