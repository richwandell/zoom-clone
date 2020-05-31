const ClientAction = require("../core/ClientAction");

class JoinMeeting extends ClientAction {

    run (meetingId) {
        console.log('JoinMeeting')
        this.state.addToMeeting(this.client, meetingId);
        let participantIds = this.meeting.participants.map((p) => p.id);

        for(let peerClient of this.meeting.participants) {
            peerClient.emit('join-meeting', {
                participants: participantIds
            })
        }
    }
}

module.exports = JoinMeeting;