import {
    REMOTE_PEER_ANSWERED,
    SERVER_CONNECTED,
    SET_LOCAL_PEER,
    SET_MEETING_ID, SET_PEER_VIDEO_ELEMENT,
    SET_REMOTE_PEER_VIDEO_STREAM,
    SET_REMOTE_PEERS,
    SET_USER_VIDEO
} from "../constants";

export function serverConnected(socket) {
    return {type: SERVER_CONNECTED, payload: socket}
}

export function setMeetingId(meetingId) {
    return {type: SET_MEETING_ID, payload: meetingId};
}

export function setUserVideo(stream, element) {
    return {type: SET_USER_VIDEO, payload: {stream, element}};
}

export function setLocalPeer(localPeer) {
    return {type: SET_LOCAL_PEER, payload: localPeer};
}

export function setRemotePeers(remotePeers) {
    return {type: SET_REMOTE_PEERS, payload: remotePeers};
}

export function setRemotePeerVideoStream(id, stream) {
    return {type: SET_REMOTE_PEER_VIDEO_STREAM, payload: {id, stream}};
}

export function remotePeerAnswered(id, answer) {
    return {type: REMOTE_PEER_ANSWERED, payload: {id, answer}};
}

export function setPeerVideoElement(id, element) {
    return {type: SET_PEER_VIDEO_ELEMENT, payload: {id, element}};
}