import io from "socket.io-client";

import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext";
import {remotePeerAnswered, remotePeerOffered, removeRemotePeer, serverConnected} from "../../actions/AppActions";

export default function useConnect() {
    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        if (state.server_connected) return;
        const location = window.location.host;
        const socket = io(location, {
            path: '/video'
        });

        socket.on('get-id', (data) => {
            dispatch(serverConnected(data.id, socket))
        })

        socket.on('connect', () => {
            socket.emit('get-id');
        });

        socket.on('join-meeting-offer', (data) => {
            dispatch(remotePeerOffered(data.id, data.offer));
        })

        socket.on('join-meeting-answer', (answer) => {
            dispatch(remotePeerAnswered(answer.id, answer.answer));
        })

        socket.on('disconnected', (data) => {
            dispatch(removeRemotePeer(data.id))
        })
    }, [state.server_connected])
}