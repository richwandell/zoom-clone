import React from "react";
import BottomBar from "./BottomBar";
import MidFrame from "./MidFrame";
import MeetingIdMenu from "./MeetingIdMenu";

export default function App(props) {
    return (
        <div className="App bp3-dark">
            {props.meeting_id !== '' ?
                <React.Fragment>
                    <MidFrame {...props} />
                    <BottomBar {...props} />
                </React.Fragment>
            : <MeetingIdMenu {...props} />}
        </div>
    )
}