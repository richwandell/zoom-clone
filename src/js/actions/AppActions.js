import {
    SERVER_CONNECTED,
    SET_LOCAL_PEER,
    SET_MEETING_ID,
    SET_PEER_VIDEO,
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

export function setPeerVideo(element) {
    return {type: SET_PEER_VIDEO, payload: element};
}

export function setLocalPeer(localPeer) {
    return {type: SET_LOCAL_PEER, payload: localPeer};
}

export function setRemotePeers(remotePeers) {
    return {type: SET_REMOTE_PEERS, payload: remotePeers};
}