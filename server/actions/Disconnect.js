const ClientAction = require("../core/ClientAction");

class Disconnect extends ClientAction {

    inMeeting() {
        return typeof this.state.clientsMeetings[this.client.id] !== "undefined"
            && typeof this.meetings[this.state.clientsMeetings[this.client.id]] !== "undefined";
    }

    run() {
        console.log('disconnect')
        this.removeNonMeetingClient();
        if (this.inMeeting()) {
            this.state.removeFromMeeting(this.client);
        }
    }
}

module.exports = Disconnect;