import React, {useContext, useEffect, useRef} from "react";
import {AppContext} from "../Context";
import {setPeerVideoElement} from "../../actions/AppActions";

export default React.memo(function PeerVideo(props) {
    const {state, dispatch} = useContext(AppContext);
    const ref = useRef();

    useEffect(() => {
        if (props.peer.videoElement !== null) return;
        dispatch(setPeerVideoElement(props.peer.id, ref.current))
    }, [props.peer.videoElement])

    useEffect(() => {
        if (props.peer.answer === null) return;
        state.local_peer.signal(props.peer.answer);
    }, [props.peer.answer])

    useEffect(() => {
        if (props.peer.videoStream === null) return;
        if (ref.current.srcObject !== props.videoStream) {
            ref.current.srcObject = props.videoStream
        }
    }, [props.peer.has_video_stream])

    return (
        <video ref={ref} className={"peer-video"} playsInline autoPlay/>
    )
}, (prevProps, nextProps) => {
    return prevProps.videoStream?.id === nextProps.videoStream?.id;
});