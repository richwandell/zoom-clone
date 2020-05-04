import React, {useState} from "react";
import {Button, Card, Elevation, FormGroup, InputGroup} from "@blueprintjs/core";

export default function MeetingIdMenu(props) {

    const [meetingId, setMeetingId] = useState('');

    return (
        <Card id={"meeting-id-menu"} elevation={Elevation.FOUR}>
            <h1>Enter Meeting ID</h1>
            <FormGroup>
                <InputGroup
                    onChange={(e) => setMeetingId(e.target.value)}
                    value={meetingId}/>
                <br />
                <Button icon="refresh" text={"Submit"} onClick={() => props.submitMeeting(meetingId)} />
            </FormGroup>
        </Card>
    )
}