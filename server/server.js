const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    path: '/video'
});
const JoinMeetingOffer = require("./actions/JoinMeetingOffer");
const JoinMeetingAnswer = require("./actions/JoinMeetingAnswer");
const Disconnect = require("./actions/Disconnect");
const State = require("./core/State");
const state = new State();

app.use(express.static('../build'))

io.on('connection', client => {
    state.addNonMeetingClient(client);

    client.on('join-meeting-offer', (meetingId, offer) => new JoinMeetingOffer(client, state).run(meetingId, offer));
    client.on('join-meeting-answer', (meetingId, answer) => new JoinMeetingAnswer(client, state).run(meetingId, answer));
    client.on('message', data => {
        console.log(data)
    });
    client.on('disconnect', () => new Disconnect(client, state).run());
});

server.listen(3001);