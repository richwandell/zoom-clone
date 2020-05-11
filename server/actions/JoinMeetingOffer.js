const ClientAction = require("../core/ClientAction");

class JoinMeetingOffer extends ClientAction {

    meetingExists(meetingId) {
        return typeof this.meetings[meetingId] !== "undefined"
            && this.meetings[meetingId].participants.length > 0;
    }

    run (meetingId, offer) {
        this.state.setClientOffer(this.client, offer);
        if (!this.meetingExists(meetingId)) {
            this.state.addToMeeting(this.client, meetingId)
        } else {
            this.state.addToMeeting(this.client, meetingId);
            for(let peerClient of this.meeting.participants) {
                let offers = this.state.getClientOffers(meetingId, peerClient);
                peerClient.emit('peers-joined', {
                    offers: offers
                })
            }
        }
    }
}

module.exports = JoinMeetingOffer;