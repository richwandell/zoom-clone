import io from "socket.io-client";
import {serverConnected} from "../../../actions/AppActions";

export default function connectEffect(state, dispatch) {
    if (state.server_connected) return;
    const location = window.location.port === "3000" ? "http://localhost:3001" : window.location.host;
    const socket = io(location, {
        path: '/video'
    });

    socket.on('get-id', (data) => {
        dispatch(serverConnected(data.id, socket))
    })

    socket.on('connect', () => {
        socket.emit('get-id');
    });
}