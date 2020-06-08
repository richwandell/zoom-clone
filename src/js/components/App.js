import React, {useContext} from 'react';
import '../../scss/App.scss';
import {AppContext} from "./context/AppContext";
import useConnect from "./hooks/useConnect";
import useMeeting from "./hooks/useMeeting";
import usePeerConnection from "./hooks/usePeerConnection";
import MidFrame from "./MidFrame";
import BottomBar from "./BottomBar";
import MeetingIdMenu from "./MeetingIdMenu";

export default function App() {

    const {state} = useContext(AppContext);

    useConnect();
    useMeeting();
    usePeerConnection();

    return (
        <div className={"App bp3-dark " + (state.meeting_id !== '' ? 'app-container' : '')}>
            {state.meeting_id !== '' ?
                <React.Fragment>
                    <MidFrame {...state} />
                    <BottomBar {...state} />
                </React.Fragment>
                : <MeetingIdMenu {...state} />}
        </div>
    )
}

