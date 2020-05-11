import React, {useContext, useEffect} from "react";
import {AppContext} from "../Context";
import {setUserVideo} from "../../actions/AppActions";

export default React.memo(function UserVideo(props) {

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


    return (
        <React.Fragment>
            <video id={"user-video"} playsInline autoPlay muted/>
        </React.Fragment>
    )
}, (prevProps, nextProps) => {
    return prevProps.user_video_stream?.id === nextProps.user_video_stream?.id;
});