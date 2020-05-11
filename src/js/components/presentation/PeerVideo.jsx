import React, {useContext, useEffect} from "react";
import {AppContext} from "../Context";
import {setPeerVideo} from "../../actions/AppActions";

export default React.memo(function PeerVideo(props) {

    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        if (state.peer_video_element !== null) return;
        const video = document.querySelector('#peer-video');
        dispatch(setPeerVideo(video))
    }, [state.peer_video_element])


    return (
        <React.Fragment>
            <video id={"peer-video"} playsInline autoPlay/>
        </React.Fragment>
    )
}, (prevProps, nextProps) => {
    return prevProps.peer_video_element === nextProps.peer_video_element;
});