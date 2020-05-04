import React, {useEffect} from "react";

export default function PeerVideo(props) {
    useEffect(() => {
        const canvas = document.querySelector("#peer-video");
    })
    return (
        <canvas id={"peer-video"} />
    )
}