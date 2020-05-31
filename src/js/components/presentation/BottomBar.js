import {Alignment, Button, Icon, Navbar} from "@blueprintjs/core";
import React, {useState} from "react";
import Styles from "../../../scss/modules/bottom-bar.module.scss"
import MicIcon from "../../../images/mic-24px.svg"
import InlineSVG from "react-inlinesvg";

export default function BottomBar(props) {

    const [audioOn, setAudioOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);

    const toggleAudio = function () {
        if (props.user_video_element === null) return;

        if (audioOn) {
            props.user_video_element.srcObject.getTracks()
                .map((t) => {
                    if (t.kind === "audio"){
                        t.enabled = false
                    }
                })
        } else {
            props.user_video_element.srcObject.getTracks()
                .map((t) => {
                    if (t.kind === "audio"){
                        t.enabled = true
                    }
                })
        }
        setAudioOn(!audioOn);
    }

    const toggleVideo = function () {
        if (props.user_video_element === null) return;

        if (videoOn) {
            props.user_video_element.srcObject.getTracks()
                .map((t) => {
                    if (t.kind === "video"){
                        t.enabled = false
                    }
                })
        } else {
            props.user_video_element.srcObject.getTracks()
                .map((t) => {
                    if (t.kind === "video"){
                        t.enabled = true
                    }
                })
        }
        setVideoOn(!videoOn);
    }

    return (
        <Navbar className={Styles.appControls}>
            <Navbar.Group align={Alignment.LEFT}>
                <div className={Styles.appControlsButton + " " + (!audioOn ? Styles.muted : "")}
                     onClick={(e) => toggleAudio()}>
                    <span className={"bp3-icon " + Styles.bp3Icon}>
                        <InlineSVG src={MicIcon} />
                    </span>
                    <div>
                        <p>Mute</p>
                    </div>
                </div>
                <Navbar.Divider/>
                <div className={Styles.appControlsButton + " " + (!videoOn ? Styles.muted : "")}
                    onClick={(e) => toggleVideo()}>
                    <Icon className={Styles.bp3Icon} icon={"video"}/>
                    <div>
                        <p>Video</p>
                    </div>
                </div>
                <Navbar.Divider/>
                <div className={Styles.appControlsButton}>
                    <Icon className={Styles.bp3Icon} icon={"desktop"}/>
                    <div>
                        <p>Share Screen</p>
                    </div>
                </div>
                <Navbar.Divider/>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Navbar.Divider/>
                <Button className="bp3-minimal" icon="home" text="Home"/>
                <Button className="bp3-minimal" icon="document" text="Files"/>
            </Navbar.Group>
        </Navbar>
    )
}