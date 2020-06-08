import React, {useContext, useEffect, useRef} from "react";
import {AppContext} from "./context/AppContext";
import {setAnswerAnswered, setOfferSignaled, setPeerVideoElement} from "../actions/AppActions";
import {Classes} from "@blueprintjs/core";

export default function PeerVideo(props) {
    const {state, dispatch} = useContext(AppContext);
    const ref = useRef();

    useEffect(() => {
        console.log("peer video effect")
    })

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
        if (props.remotePeer.offer === null) return;
        if (props.remotePeer.offer_signaled === true) return;

        const remote = props.remotePeer;

        remote.peer.on('signal',  (answer) => {
            state.socket.emit('join-meeting-answer', remote.id, answer);
        });

        remote.peer.signal(props.remotePeer.offer);
        dispatch(setOfferSignaled(remote.id));
    }, [props.remotePeer.offer, props.remotePeer.offer_signaled])

    useEffect(() => {
        if (!props.remotePeer.has_video_stream) return;
        if (props.remotePeer.videoElement === null) return;
        if (props.remotePeer.answer === null) return;
        if (props.remotePeer.answer_signaled === true) return;
        console.log("working")

        props.localPeer.peer.signal(props.remotePeer.answer);
        dispatch(setAnswerAnswered(props.remotePeer.id));
    }, [props.remotePeer.answer, props.remotePeer.has_video_stream, props.remotePeer.videoElement, props.remotePeer.answer_signaled])

    const loading = !props.remotePeer.answer_signaled //&& props.remotePeer.answer !== null;

    return (
        <video ref={ref} className={loading ? Classes.SKELETON : "peer-video"} playsInline autoPlay/>
    )
}