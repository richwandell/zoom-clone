const ClientAction = require("../core/ClientAction");

class JoinMeetingOffer extends ClientAction {

    run (meetingId, participant, offer) {
        console.log('JoinMeetingOffer')
        this.state.addToMeeting(this.client, meetingId);
        for(let peerClient of this.meeting.participants) {
            if (peerClient.id === participant) {
                peerClient.emit('join-meeting-offer', {
                    id: this.client.id,
                    offer: offer
                });
            }
        }
    }
}

module.exports = JoinMeetingOffer;