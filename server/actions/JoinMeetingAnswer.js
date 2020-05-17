const ClientAction = require("../core/ClientAction");

class JoinMeetingAnswer extends ClientAction {
    run (meetingId, participant, answer) {
        for(let peerClient of this.meeting.participants) {
            if (peerClient.id === participant) {
                peerClient.emit('join-meeting-answer', answer)
            }
        }
    }
}

module.exports = JoinMeetingAnswer;