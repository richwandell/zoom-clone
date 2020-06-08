import Styles from "../../../scss/modules/bottom-bar.module.scss";
import {Alignment, Button, Icon, Navbar} from "@blueprintjs/core";
import InlineSVG from "react-inlinesvg";
import MicIcon from "../../../images/mic-24px.svg";
import React from "react";

export default function BottomBar(props) {
    return (
        <Navbar className={Styles.appControls}>
            <Navbar.Group align={Alignment.LEFT}>
                <div className={Styles.appControlsButton + " " + (!props.audioOn ? Styles.muted : "")}
                     onClick={(e) => props.toggleAudio()}>
                    <span className={"bp3-icon " + Styles.bp3Icon}>
                        <InlineSVG src={MicIcon} />
                    </span>
                    <div>
                        <p>Audio</p>
                    </div>
                </div>
                <Navbar.Divider/>
                <div className={Styles.appControlsButton + " " + (!props.videoOn ? Styles.muted : "")}
                     onClick={(e) => props.toggleVideo()}>
                    <Icon className={Styles.bp3Icon} icon={"video"}/>
                    <div>
                        <p>Video</p>
                    </div>
                </div>
                <Navbar.Divider/>
                <div className={Styles.appControlsButton}
                     onClick={() => props.toggleScreenShare()}>
                    <Icon className={Styles.bp3Icon} icon={"desktop"}/>
                    <div>
                        {props.screenShareOn ?
                        <p>Stop Sharing</p> : <p>Share Screen</p>}
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