import {
    REMOTE_PEER_ANSWERED,
    SERVER_CONNECTED,
    SET_ANSWER_ANSWERED,
    SET_LOCAL_PEER,
    SET_MEETING_ID,
    SET_PEER_CONNECTIONS,
    SET_PEER_VIDEO_ELEMENT,
    SET_REMOTE_PEER_VIDEO_STREAM,
    SET_REMOTE_PEERS,
    SET_USER_VIDEO
} from "../constants";
import Peer from "simple-peer";
import {Socket} from "socket.io-client";

/**
 * @typedef RemotePeer
 * @property {string} id
 * @property {Peer} remotePeer
 * @property {Object} answer
 * @property {MediaStream} videoStream
 * @property {HTMLVideoElement} videoElement
 */

/**
 * @typedef LocalPeer
 * @property {string} id
 * @property {Peer} localPeer
 */

/**
 * @typedef AppState
 * @property {string} meeting_id
 * @property {Socket} socket
 * @property {string} server_id
 * @property {boolean} server_connected
 * @property {MediaStream} user_video_stream
 * @property {HTMLVideoElement} user_video_element
 * @property {LocalPeer[]} local_peers
 * @property {RemotePeer[]} remote_peers
 */

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
    remote_peers: []
};

/**
 *
 * @param {AppState} state
 * @param action
 * @returns AppState
 */
export function appReducer(state, action) {
    console.log(action.type)
    switch(action.type) {
        case SET_PEER_CONNECTIONS:
            return (() => {
                const newLocalPeers = state.local_peers.slice();
                const newRemotePeers = state.remote_peers.slice();
                for(let connection of action.payload) {
                    newLocalPeers.push(connection[0]);
                    newRemotePeers.push(connection[1]);
                }

                return {
                    ...state,
                    local_peers: newLocalPeers,
                    remote_peers: newRemotePeers
                }
            })();

        case SET_ANSWER_ANSWERED:
            return (() => {
                const peer = state.remote_peers.find((p) => p.id === action.payload);
                const index = state.remote_peers.indexOf(peer);

                const newPeers = state.remote_peers
                    .slice(0, index)
                    .concat([{
                        ...peer,
                        answer: {
                            ...peer.answer,
                            answered: true
                        }
                    }])
                    .concat(state.remote_peers.slice(index + 1));

                return {
                    ...state,
                    remote_peers: newPeers
                }
            })();

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

        case REMOTE_PEER_ANSWERED:
            return (() => {
                const peer = state.remote_peers.find((p) => p.id === action.payload.id);
                if (peer.answer?.answered) return state;

                const index = state.remote_peers.indexOf(peer);

                const newPeers = state.remote_peers
                    .slice(0, index)
                    .concat([{
                        ...peer,
                        answer: {...action.payload.answer, answered: false}
                    }])
                    .concat(state.remote_peers.slice(index + 1));

                return {
                    ...state,
                    remote_peers: newPeers
                }
            })();

        case SET_REMOTE_PEER_VIDEO_STREAM:
            return (() => {
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
            })();

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
            return {
                ...state,
                user_video_stream: action.payload.stream,
                user_video_element: action.payload.element
            };

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


