import {Alignment, Button, Icon, Navbar} from "@blueprintjs/core";
import React from "react";

export default function BottomBar(props) {
    return (
        <Navbar id={"app-controls"}>
            <Navbar.Group align={Alignment.LEFT}>
                <div className={"app-controls-button"}>
                    <Icon icon={"phone"}/>
                    <div>
                        <p>Mute</p>
                    </div>
                </div>
                <Navbar.Divider/>
                <div className={"app-controls-button"}>
                    <Icon icon={"video"}/>
                    <div>
                        <p>Video</p>
                    </div>
                </div>
                <Navbar.Divider/>
                <div className={"app-controls-button"}>
                    <Icon icon={"desktop"}/>
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