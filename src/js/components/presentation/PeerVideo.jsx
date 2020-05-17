import React, {useContext, useEffect, useRef} from "react";
import {AppContext} from "../Context";
import {setAnswerAnswered, setPeerVideoElement} from "../../actions/AppActions";
import {Classes} from "@blueprintjs/core";

export default function PeerVideo(props) {
    const {state, dispatch} = useContext(AppContext);
    const ref = useRef();

    useEffect(() => {
        if (props.remotePeer.videoElement !== null) return;
        dispatch(setPeerVideoElement(props.remotePeer.id, ref.current))
    }, [props.remotePeer.videoElement])

    useEffect(() => {
        if (props.remotePeer.videoStream === null) return;
        if (ref.current.srcObject !== props.remotePeer.videoStream) {
            ref.current.srcObject = props.remotePeer.videoStream
        }
    }, [props.remotePeer.has_video_stream])

    useEffect(() => {
        if (props.remotePeer.answer === null) return;
        if (!props.remotePeer.has_video_stream) return;
        if (props.remotePeer.videoElement === null) return;
        if (props.remotePeer.answer.answered === true) return;
        console.log("working")

        props.localPeer.signal(props.remotePeer.answer);
        dispatch(setAnswerAnswered(props.remotePeer.id));
    }, [props.remotePeer.answer, props.remotePeer.has_video_stream, props.remotePeer.videoElement])

    const loading = props.remotePeer.has_video_stream && props.remotePeer.answer !== null;

    return (
        <video ref={ref} className={loading ? Classes.SKELETON : "peer-video"} playsInline autoPlay/>
    )
};