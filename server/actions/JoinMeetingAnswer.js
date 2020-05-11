const ClientAction = require("../core/ClientAction");

class JoinMeetingAnswer extends ClientAction {
    run (meetingId, answer) {
        this.state.setClientAnswer(this.client, answer);

        for(let peerClient of this.meeting.participants) {
            let answers = this.state.getClientAnswers(meetingId, peerClient);
            if (answers.length > 0) {
                peerClient.emit('peers-joined-answers', {
                    answers
                })
            }
        }
    }
}

module.exports = JoinMeetingAnswer;