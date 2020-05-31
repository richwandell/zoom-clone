import {Alignment, Button, Icon, Navbar} from "@blueprintjs/core";
import React from "react";
import Styles from "../../../scss/modules/bottom-bar.module.scss"
import MicIcon from "../../../images/mic-24px.svg"
import InlineSVG from "react-inlinesvg";

export default function BottomBar(props) {



    return (
        <Navbar className={Styles.appControls}>
            <Navbar.Group align={Alignment.LEFT}>
                <div className={Styles.appControlsButton}>
                    <span className={"bp3-icon " + Styles.bp3Icon}>
                        <InlineSVG src={MicIcon} />
                    </span>
                    <div>
                        <p>Mute</p>
                    </div>
                </div>
                <Navbar.Divider/>
                <div className={Styles.appControlsButton}>
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