export const settingsInitialState = {
    meeting_id: '',
    socket: null,
    server_id: '',
    server_connected: false,
    user_video_stream: null,
    user_video_element: null,
    local_peers: [],
    remote_peers: []
};


export function settingsReducer(state, action) {
    switch(action.type) {
        default:
            return settingsInitialState;
    }
}