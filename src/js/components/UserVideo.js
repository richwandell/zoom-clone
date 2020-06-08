import React, {useContext, useEffect, useRef} from "react";
import {Classes} from "@blueprintjs/core";
import {AppContext} from "./context/AppContext";
import {setUserVideo, toggleScreenShare as screenShare} from "../actions/AppActions";

export default React.memo(function UserVideo(props) {
    const {state, dispatch} = useContext(AppContext);
    const ref = useRef();

    function shareVideo() {
        console.log("share video")
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then((stream) => {
            ref.current.srcObject = stream;
            dispatch(setUserVideo(stream, ref.current))
        }).catch((error) => {
            console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
        });
    }

    function shareScreen() {
        navigator.mediaDevices.getDisplayMedia({video: true})
            .then((stream) => {
                stream.addEventListener('inactive', e => {
                    dispatch(screenShare());
                    shareVideo();
                });
                ref.current.srcObject = stream;
                dispatch(setUserVideo(stream, ref.current))
            })
            .catch((error) => {
                console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
                shareVideo();
            })
    }

    useEffect(() => {
        if (state.sharing_screen) {
            shareScreen();
        } else {
            shareVideo();
        }
    }, [state.sharing_screen])

    const loading = state.user_video_stream === null;

    return (
        <video
            ref={ref}
            id={"user-video"}
            className={
                (loading ? Classes.SKELETON : "") +
                (state.remote_peers.length > 0 ? "hidden" : "")
            } playsInline autoPlay muted/>
    )
}, (prevProps, nextProps) => {
    return prevProps.user_video_stream?.id === nextProps.user_video_stream?.id;
});