import {joinMeeting, setPeerConnections} from "../../../actions/AppActions";
import SimplePeer from "simple-peer";

export default function meetingEffect(state, dispatch) {
    if (!state.server_connected) return;
    if (state.user_video_stream === null) return;
    if (state.meeting_id === '') return;

    //TODO: move this into the reducer
    state.socket.on('join-meeting', (data) => {
        dispatch(joinMeeting(data.participants));


        // dispatch(setPeerConnections(peerConnections))
    });

    state.socket.emit('join-meeting', state.meeting_id);
}