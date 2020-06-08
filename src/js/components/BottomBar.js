import React, {useContext, useState} from "react";
import BottomBarPresentation from "./presentation/BottomBar";
import {AppContext} from "./context/AppContext";
import {toggleScreenShare as screenShare} from "../actions/AppActions";

export default function BottomBar(props) {
    const {state, dispatch} = useContext(AppContext);

    const [audioOn, setAudioOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);

    const toggleAudio = function () {
        if (props.user_video_element === null) return;

        if (audioOn) {
            props.user_video_element.srcObject.getTracks()
                .map((t) => {
                    if (t.kind === "audio"){
                        t.enabled = false
                    }
                })
        } else {
            props.user_video_element.srcObject.getTracks()
                .map((t) => {
                    if (t.kind === "audio"){
                        t.enabled = true
                    }
                })
        }
        setAudioOn(!audioOn);
    }

    const toggleVideo = function () {
        if (props.user_video_element === null) return;

        if (videoOn) {
            props.user_video_element.srcObject.getTracks()
                .map((t) => {
                    if (t.kind === "video"){
                        t.enabled = false
                    }
                })
        } else {
            props.user_video_element.srcObject.getTracks()
                .map((t) => {
                    if (t.kind === "video"){
                        t.enabled = true
                    }
                })
        }
        setVideoOn(!videoOn);
    }

    const toggleScreenShare = function() {
        if (props.user_video_element === null) return;
        if (state.sharing_screen) {
            props.user_video_element.srcObject.getTracks().forEach(track => track.stop());
        } else {
            dispatch(screenShare());
        }
    }

    return (
        <BottomBarPresentation {...{
            audioOn,
            videoOn,
            screenShareOn: state.sharing_screen,
            toggleScreenShare,
            toggleAudio,
            toggleVideo
        }} />
    )
}