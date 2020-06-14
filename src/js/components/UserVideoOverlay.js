import React, {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "./context/AppContext";
import * as faceapi from "face-api.js";

export default function UserVideoOverlay(props) {
    const {state, dispatch} = useContext(AppContext);
    const ref = useRef();

    const [rect, setRect] = useState({
        height: 0,
        width: 0,
        x: 0,
        y: 0
    });

    const mtcnnForwardParams = {
        // number of scaled versions of the input image passed through the CNN
        // of the first stage, lower numbers will result in lower inference time,
        // but will also be less accurate
        maxNumScales: 10,
        // scale factor used to calculate the scale steps of the image
        // pyramid used in stage 1
        scaleFactor: 0.709,
        // the score threshold values used to filter the bounding
        // boxes of stage 1, 2 and 3
        scoreThresholds: [0.6, 0.7, 0.7],
        // mininum face size to expect, the higher the faster processing will be,
        // but smaller faces won't be detected
        minFaceSize: 200
    }

    useEffect(() => {
        if (state.user_video_stream === null) return;
        console.log("starting")


        async function run() {
            const results = await faceapi.mtcnn(state.user_video_element, mtcnnForwardParams);
            if (results.length > 0) {

            }
            requestAnimationFrame(run);
        }

        requestAnimationFrame(run);

        setRect(state.user_video_element.getBoundingClientRect());

    }, [state.user_video_stream])

    const style = {
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height
    }

    return (
        <canvas style={style} ref={ref} id={"user-video-overlay"}/>
    )
};