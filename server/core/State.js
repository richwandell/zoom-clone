/**
 * @property {Object} meetings
 * @property {Object} nonMeetingClients
 * @property {Object} clientOffers
 * @property {Object} clientsMeetings
 */
class State {

    constructor() {
        this.clientOffers = {};
        this.clientAnswers = {};
        this.meetings = {};
        this.nonMeetingClients = {};
        this.clientsMeetings = {};
    }

    /**
     *
     * @param {Client} client
     * @param {string} offer
     */
    setClientOffer(client, offer) {
        this.clientOffers[client.id] = offer;
    }

    /**
     *
     * @param {Client} client
     * @param {string} answer
     */
    setClientAnswer(client, answer) {
        this.clientAnswers[client.id] = answer;
    }

    getClientOffers(meetingId, client=false) {
        const clients = this.meetings[meetingId].participants;
        const offers = [];
        for(let peerClient of clients) {
            if (peerClient !== client) {
                offers.push({
                    id: peerClient.id,
                    offer: this.clientOffers[peerClient.id]
                });
            }
        }
        return offers;
    }

    getClientAnswers(meetingId, client = false) {
        const clients = this.meetings[meetingId].participants;
        const answers = [];
        for(let peerClient of clients) {
            if (peerClient !== client) {
                if (typeof this.clientAnswers[peerClient.id] !== "undefined") {
                    answers.push({
                        id: peerClient.id,
                        answer: this.clientAnswers[peerClient.id]
                    });
                }
            }
        }
        return answers;
    }

    /**
     * @param {string} clientId
     */
    removeNonMeetingClient(clientId) {
        this.nonMeetingClients[clientId] = undefined;
        delete this.nonMeetingClients[clientId];
    }

    /**
     * @param {Client} client
     */
    addNonMeetingClient(client) {
        this.nonMeetingClients[client.id] = client;
    }

    /**
     * @param {string} id
     */
    removeAllFromMeeting(id) {
        for (let c of this.meetings[id].participants) {
            c.emit('leave-meeting')
        }
        delete this.meetings[id];
    }

    /**
     *
     * @param {Client} client
     */
    removeFromMeeting(client) {
        const meetingId = this.clientsMeetings[client.id];
        let index = this.meetings[meetingId].participants.indexOf(client);
        if (index > -1) {
            this.meetings[meetingId].participants = this.meetings[meetingId].participants
                .slice(0, index)
                .concat(this.meetings[meetingId].participants.slice(index + 1));
        }
        this.clientsMeetings[meetingId] = undefined;
        delete this.clientsMeetings[meetingId];
        this.addNonMeetingClient(client);
        if (this.meetings[meetingId].participants.length === 0) {
            delete this.meetings[meetingId];
        }
    }

    /**
     * @param {Client} client
     * @param {string} meetingId
     */
    addToMeeting(client, meetingId) {
        this.clientsMeetings[client.id] = meetingId;
        if (typeof this.meetings[meetingId] === "undefined") {
            this.meetings[meetingId] = {
                participants: []
            }
        }
        const index = this.meetings[meetingId].participants.indexOf(client);
        if (index === -1) {
            this.meetings[meetingId].participants.push(client);
        }
        this.removeNonMeetingClient(client.id);
    }
}

module.exports = State;