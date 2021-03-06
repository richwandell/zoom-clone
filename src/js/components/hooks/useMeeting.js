import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext";
import {joinMeeting} from "../../actions/AppActions";

export default function useMeeting() {
    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        if (!state.server_connected) return;
        if (state.user_video_stream === null) return;
        if (state.meeting_id === '') return;

        //TODO: move this into the reducer
        state.socket.on('join-meeting', (data) => {
            dispatch(joinMeeting(data.participants));


            // dispatch(setPeerConnections(peerConnections))
        });

        state.socket.emit('join-meeting', state.meeting_id);
    }, [state.server_connected, state.meeting_id, state.user_video_stream])

}