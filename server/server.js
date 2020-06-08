const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    path: '/video'
});
const JoinMeeting = require("./actions/JoinMeeting");
const JoinMeetingOffer = require("./actions/JoinMeetingOffer");
const JoinMeetingAnswer = require("./actions/JoinMeetingAnswer");
const Disconnect = require("./actions/Disconnect");
const State = require("./core/State");
const state = new State();

app.use(express.static('../build'))

io.on('connection', client => {
    state.addNonMeetingClient(client);

    client.on('get-id', () => {
        client.emit('get-id', {
            id: client.id
        })
    })
    client.on('join-meeting', (meetingId) => new JoinMeeting(client, state).run(meetingId))
    client.on('join-meeting-offer', (meetingId, participant, offer) => new JoinMeetingOffer(client, state).run(meetingId, participant, offer));
    client.on('join-meeting-answer', (participant, answer) => new JoinMeetingAnswer(client, state).run(participant, answer));
    client.on('message', data => {
        console.log(data)
    });
    client.on('disconnect', () => new Disconnect(client, state).run());
});

server.listen(3001, "0.0.0.0");