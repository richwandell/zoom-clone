const ClientAction = require("../core/ClientAction");

class JoinMeetingAnswer extends ClientAction {
    run (participant, answer) {
        console.log('JoinMeetingAnswer')
        for(let peerClient of this.meeting.participants) {
            if (peerClient.id === participant) {
                peerClient.emit('join-meeting-answer', {
                    id: this.client.id,
                    answer
                })
            }
        }
    }
}

module.exports = JoinMeetingAnswer;