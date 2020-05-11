import {
    SERVER_CONNECTED,
    SET_LOCAL_PEER,
    SET_MEETING_ID,
    SET_PEER_VIDEO,
    SET_REMOTE_PEERS,
    SET_USER_VIDEO
} from "../constants";

export const appInitialState = {
    meeting_id: '',
    socket: null,
    server_connected: false,
    user_video_stream: null,
    user_video_element: null,
    peer_video_stream: null,
    peer_video_element: null,
    local_peer: null,
    remote_peers: {}
};

export function appReducer(state, action) {
    switch(action.type) {
        case SET_REMOTE_PEERS:
            return {
                ...state,
                remote_peers: action.payload
            }

        case SET_LOCAL_PEER:
            return {
                ...state,
                local_peer: action.payload
            }

        case SET_USER_VIDEO:
            return {
                ...state,
                user_video_stream: action.payload.stream,
                user_video_element: action.payload.element
            };

        case SET_PEER_VIDEO:
            return {
                ...state,
                peer_video_element: action.payload
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