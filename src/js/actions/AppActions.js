import {SERVER_CONNECTED, SET_MEETING_ID, SET_USER_VIDEO_STREAM} from "../constants";

export function serverConnected(socket) {
    return {type: SERVER_CONNECTED, payload: socket}
}

export function setMeetingId(meetingId) {
    return {type: SET_MEETING_ID, payload: meetingId};
}

export function setUserVideoStream(stream) {
    return {type: SET_USER_VIDEO_STREAM, payload: stream};
}