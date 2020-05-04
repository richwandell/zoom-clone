const server = require('http').createServer();

const io = require('socket.io')(server, {
    path: '/video'
});

const meetings = {};
const nonMeetingClients = {};


io.on('connection', client => {

    nonMeetingClients[client.id] = client;

    client.on('offer', (meetingId, offer) => {
        meetings[meetingId] = {
            'participants': [client],
            'offer': offer
        }
        client.meeting_id = meetingId;
        nonMeetingClients[client.id] = undefined;
        console.log(meetingId, offer)
    });

    client.on('join-meeting', meetingId => {
        if (
            typeof meetings[meetingId] !== "undefined"
            && meetings[meetingId].participants.length > 0
        ) {
            meetings[meetingId].participants.push(client);
            client.meeting_id = meetingId;
            nonMeetingClients[client.id] = undefined;
            client.emit('join-meeting', {
                success: true,
                offer: meetings[meetingId].offer
            });
        } else {
            client.emit('join-meeting', {
                success: false,
                meetingId
            });
        }
    })

    client.on('message', data => {
        console.log(data)
    });

    client.on('disconnect', () => {
        delete nonMeetingClients[client.id];
        if (typeof client.meeting_id !== "undefined") {
            if (typeof meetings[client.meeting_id] !== "undefined") {
                let index = meetings[client.meeting_id].participants.indexOf(client);
                if (index > -1) {
                    meetings[client.meeting_id].participants = meetings[client.meeting_id].participants
                        .slice(0, index)
                        .concat(meetings[client.meeting_id].participants.slice(index + 1));
                }
            }
        }
        console.log('disconnect')
    });
});

server.listen(3001);