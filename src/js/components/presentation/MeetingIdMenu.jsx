import React, {useContext, useState} from "react";
import {Button, Card, Elevation, FormGroup, InputGroup} from "@blueprintjs/core";
import {AppContext} from "../Context";
import {setMeetingId} from "../../actions/AppActions";

export default function MeetingIdMenu(props) {

    const [meetingId, setLocalMeetingId] = useState('');
    const {state, dispatch} = useContext(AppContext);

    return (
        <Card id={"meeting-id-menu"} elevation={Elevation.FOUR}>
            <h1>Enter Meeting ID</h1>
            <FormGroup>
                <InputGroup
                    onChange={(e) => setLocalMeetingId(e.target.value)}
                    value={meetingId}/>
                <br />
                <Button icon="refresh" text={"Submit"} onClick={() => dispatch(setMeetingId(meetingId))} />
            </FormGroup>
        </Card>
    )
}