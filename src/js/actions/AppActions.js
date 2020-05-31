import {
    JOIN_MEETING,
    REMOTE_PEER_ANSWERED, REMOTE_PEER_OFFERED,
    SERVER_CONNECTED, SET_ANSWER_ANSWERED,
    SET_LOCAL_PEER,
    SET_MEETING_ID, SET_OFFER_SIGNALED, SET_PEER_CONNECTION, SET_PEER_CONNECTIONS, SET_PEER_VIDEO_ELEMENT,
    SET_REMOTE_PEER_VIDEO_STREAM,
    SET_REMOTE_PEERS,
    SET_USER_VIDEO
} from "../constants";

export function serverConnected(id, socket) {
    return {type: SERVER_CONNECTED, payload: {id, socket}}
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

export function remotePeerOffered(id, offer) {
    return {type: REMOTE_PEER_OFFERED, payload: {id, offer}};
}

export function remotePeerAnswered(id, answer) {
    return {type: REMOTE_PEER_ANSWERED, payload: {id, answer}};
}

export function setPeerVideoElement(id, element) {
    return {type: SET_PEER_VIDEO_ELEMENT, payload: {id, element}};
}

export function setAnswerAnswered(id) {
    return {type: SET_ANSWER_ANSWERED, payload: id};
}

export function setPeerConnections(connections) {
    return {type: SET_PEER_CONNECTIONS, payload: connections};
}

export function setOfferSignaled(id) {
    return {type: SET_OFFER_SIGNALED, payload: id};
}

export function joinMeeting(participantIds) {
    return {type: JOIN_MEETING, payload: participantIds};
}