import React, {useContext, useEffect, useRef} from "react";
import {Classes} from "@blueprintjs/core";
import {AppContext} from "../context/AppContext";
import {setUserVideo} from "../../actions/AppActions";

export default React.memo(function UserVideo(props) {
    const {state, dispatch} = useContext(AppContext);
    const ref = useRef();

    useEffect(() => {
        if (state.user_video_stream !== null) return;
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then((stream) => {
            ref.current.srcObject = stream;
            dispatch(setUserVideo(stream, ref.current))
        }).catch((error) => {
            console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
        });
    }, [state.user_video_stream])

    const loading = state.user_video_stream === null;

    return (
        <video
            ref={ref}
            id={"user-video"}
            className={loading ? Classes.SKELETON : ""} playsInline autoPlay muted/>
    )
}, (prevProps, nextProps) => {
    return prevProps.user_video_stream?.id === nextProps.user_video_stream?.id;
});