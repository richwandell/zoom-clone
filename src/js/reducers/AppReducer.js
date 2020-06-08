import {
    JOIN_MEETING,
    REMOTE_PEER_ANSWERED,
    REMOTE_PEER_OFFERED,
    REMOVE_REMOTE_PEER,
    SERVER_CONNECTED,
    SET_ANSWER_ANSWERED,
    SET_LOCAL_PEER,
    SET_MEETING_ID,
    SET_OFFER_SIGNALED,
    SET_PEER_VIDEO_ELEMENT,
    SET_REMOTE_PEER_VIDEO_STREAM,
    SET_REMOTE_PEERS,
    SET_USER_VIDEO, TOGGLE_SCREEN_SHARE
} from "../constants";
import SimplePeer from "simple-peer";


/**
 * @type AppState
 */
export const appInitialState = {
    meeting_id: '',
    socket: null,
    server_id: '',
    server_connected: false,
    user_video_stream: null,
    user_video_element: null,
    local_peers: [],
    remote_peers: [],
    sharing_screen: false
};

/**
 *
 * @param {AppState} state
 * @param action
 * @return AppState
 */
function joinMeeting(state, action) {
    const newLocalPeers = state.local_peers.slice();
    const newRemotePeers = state.remote_peers.slice();
    for(let participant of action.payload) {
        if (participant === state.server_id) continue;
        const existingLocalPeer = state.local_peers.find((p) => p.id === participant);
        const existingRemotePeer = state.remote_peers.find((p) => p.id === participant);
        if (existingLocalPeer !== undefined || existingRemotePeer !== undefined) continue;

        const localPeer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: state.user_video_stream
        });

        const remotePeer = new SimplePeer({
            initiator: false,
            trickle: false
        });

        newLocalPeers.push({
            id: participant,
            peer: localPeer
        });
        newRemotePeers.push({
            id: participant,
            peer: remotePeer,
            offer: null,
            offer_signaled: false,
            answer: null,
            answer_signaled: false,
            videoStream: null,
            videoElement: null,
            has_video_stream: false
        });
    }

    return {
        ...state,
        local_peers: newLocalPeers,
        remote_peers: newRemotePeers
    }
}

/**
 *
 * @param {AppState} state
 * @param action
 * @return AppState
 */
function setAnswerAnswered(state, action) {
    const peer = state.remote_peers.find((p) => p.id === action.payload);
    const index = state.remote_peers.indexOf(peer);

    const newPeers = state.remote_peers
        .slice(0, index)
        .concat([{
            ...peer,
            answer_signaled: true
        }])
        .concat(state.remote_peers.slice(index + 1));

    return {
        ...state,
        remote_peers: newPeers
    }
}

/**
 *
 * @param {AppState} state
 * @param action
 * @return AppState
 */
function remotePeerOffered(state, action){
    const peer = state.remote_peers.find((p) => p.id === action.payload.id);
    if (peer.offer_signaled) return state;

    const index = state.remote_peers.indexOf(peer);

    const newPeers = state.remote_peers
        .slice(0, index)
        .concat([{
            ...peer,
            offer: action.payload.offer
        }])
        .concat(state.remote_peers.slice(index + 1));

    return {
        ...state,
        remote_peers: newPeers
    }
}

/**
 *
 * @param {AppState} state
 * @param action
 * @return AppState
 */
function removeRemotePeer(state, action) {
    const localPeer = state.local_peers.find((p) => p.id === action.payload);
    const remotePeer = state.remote_peers.find((p) => p.id === action.payload);

    let index = state.local_peers.indexOf(localPeer);
    const newLocalPeers = state.local_peers
        .slice(0, index)
        .concat(state.local_peers.slice(index + 1));

    index = state.remote_peers.indexOf(remotePeer);
    const newRemotePeers = state.remote_peers
        .slice(0, index)
        .concat(state.remote_peers.slice(index + 1));
    return {
        ...state,
        remote_peers: newRemotePeers,
        local_peers: newLocalPeers
    }
}

/**
 *
 * @param {AppState} state
 * @param action
 * @return AppState
 */
function setOfferSignaled(state, action) {
    const peer = state.remote_peers.find((p) => p.id === action.payload);
    const index = state.remote_peers.indexOf(peer);

    const newPeers = state.remote_peers
        .slice(0, index)
        .concat([{
            ...peer,
            offer_signaled: true
        }])
        .concat(state.remote_peers.slice(index + 1));

    return {
        ...state,
        remote_peers: newPeers
    }
}

/**
 *
 * @param {AppState} state
 * @param action
 * @return AppState
 */
function toggleScreenShare(state, action) {
    return {
        ...state,
        sharing_screen: !state.sharing_screen
    }
}

/**
 *
 * @param {AppState} state
 * @param action
 * @return AppState
 */
function setUserVideo(state, action) {
    let currentStream = state.user_video_stream;
    if (state.user_video_element !== null && state.user_video_stream !== null) {
        const oldTrack = state.user_video_stream.getVideoTracks()[0]
        const newTrack = action.payload.stream.getVideoTracks()[0];
        for(let localPeer of state.local_peers) {
            localPeer.peer.replaceTrack(oldTrack, newTrack, state.user_video_stream);
        }
    } else {
        currentStream = action.payload.stream;
    }

    return {
        ...state,
        user_video_stream: currentStream,
        user_video_element: action.payload.element
    };
}

/**
 *
 * @param {AppState} state
 * @param action
 * @return AppState
 */
function setRemotePeerVideoStream(state, action) {
    const peer = state.remote_peers.find((p) => p.id === action.payload.id);
    const index = state.remote_peers.indexOf(peer);

    const newPeers = state.remote_peers
        .slice(0, index)
        .concat([{
            ...peer,
            videoStream: action.payload.stream,
            has_video_stream: true
        }])
        .concat(state.remote_peers.slice(index + 1));

    return {
        ...state,
        remote_peers: newPeers
    }
}

/**
 *
 * @param {AppState} state
 * @param action
 * @returns AppState
 */
export function appReducer(state, action) {
    console.log(action.type)
    switch(action.type) {
        case TOGGLE_SCREEN_SHARE:
            return toggleScreenShare(state, action);

        case REMOVE_REMOTE_PEER:
            return removeRemotePeer(state, action);

        case JOIN_MEETING:
            return joinMeeting(state, action);

        case SET_ANSWER_ANSWERED:
            return setAnswerAnswered(state, action);

        case SET_OFFER_SIGNALED:
            return setOfferSignaled(state, action);

        case SET_PEER_VIDEO_ELEMENT:
            return (() => {
                const peer = state.remote_peers.find((p) => p.id === action.payload.id);
                const index = state.remote_peers.indexOf(peer);

                const newPeers = state.remote_peers
                    .slice(0, index)
                    .concat([{
                        ...peer,
                        videoElement: action.payload.element
                    }])
                    .concat(state.remote_peers.slice(index + 1));

                return {
                    ...state,
                    remote_peers: newPeers
                }
            })();

        case REMOTE_PEER_OFFERED:
            return remotePeerOffered(state, action);

        case REMOTE_PEER_ANSWERED:
            return (() => {
                const peer = state.remote_peers.find((p) => p.id === action.payload.id);
                if (peer.answer?.answered) return state;

                const index = state.remote_peers.indexOf(peer);

                const newPeers = state.remote_peers
                    .slice(0, index)
                    .concat([{
                        ...peer,
                        answer: action.payload.answer
                    }])
                    .concat(state.remote_peers.slice(index + 1));

                return {
                    ...state,
                    remote_peers: newPeers
                }
            })();

        case SET_REMOTE_PEER_VIDEO_STREAM:
            return setRemotePeerVideoStream(state, action);

        case SET_REMOTE_PEERS:
            return (() => {
                const newPeers = state.remote_peers.slice();
                for(let peer of action.payload) {
                    const tmpPeer = newPeers.find((p) => p.id === peer.id);
                    if (!tmpPeer) {
                        newPeers.push(peer);
                    }
                }
                return {
                    ...state,
                    remote_peers: newPeers
                }
            })();

        case SET_LOCAL_PEER:
            return {
                ...state,
                local_peer: action.payload
            }

        case SET_USER_VIDEO:
            return setUserVideo(state, action);

        case SET_MEETING_ID:
            return {
                ...state,
                meeting_id: action.payload
            };

        case SERVER_CONNECTED:
            return {
                ...state,
                socket: action.payload.socket,
                server_connected: true,
                server_id: action.payload.id
            };

        default:
            return appInitialState;
    }
}


