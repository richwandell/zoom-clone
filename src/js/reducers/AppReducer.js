import {SERVER_CONNECTED, SET_MEETING_ID, SET_USER_VIDEO_STREAM} from "../constants";

export const appInitialState = {
    meeting_id: '',
    socket: null,
    server_connected: false,
    user_video_stream: null
};

export function appReducer(state, action) {
    switch(action.type) {
        case SET_USER_VIDEO_STREAM:
            return {
                ...state,
                user_video_stream: action.payload
            };

        case SET_MEETING_ID:
            return {
                ...state,
                meeting_id: action.payload
            };

        case SERVER_CONNECTED:
            return {
                ...state,
                socket: action.payload,
                server_connected: true
            };

        default:
            return appInitialState;
    }
}