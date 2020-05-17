/**
 * @property {State} state
 * @property {Client} client
 * @property {Object} meetings
 * @property {Object} nonMeetingClients
 */
class ClientAction{
    /**
     * @param {Client} client
     * @param {State} state
     */
    constructor(client, state) {
        this.state = state;
        this.client = client;
        this.meetings = state.meetings
        this.nonMeetingClients = state.nonMeetingClients;
    }

    run() {
        console.error("Run not implemented");
    }

    removeNonMeetingClient() {
        this.state.removeNonMeetingClient(this.client.id);
    }

    get meeting() {
        if (typeof this.state.clientsMeetings[this.client.id] !== "undefined") {
            return this.state.meetings[this.state.clientsMeetings[this.client.id]];
        }
        return {
            participants: []
        }
    }
}

module.exports = ClientAction;