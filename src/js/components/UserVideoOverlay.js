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

        function run() {
            (async () => {
                const results = await faceapi.mtcnn(state.user_video_element, mtcnnForwardParams);
                if (results.length > 0) {
                    /**
                     * @type {CanvasRenderingContext2D} ctx
                     */
                    const ctx = ref.current.getContext("2d")

                    ctx.clearRect(0, 0, ref.current.width, ref.current.height);

                    // for (let item of results) {
                    //     console.log(results)
                    //     const rect = item.alignedRect;
                    //     const {x, y, width, height} = rect.box;
                    //     console.log(x, y, width, height)
                    //     ctx.strokeRect
                    // }
                    faceapi.draw.drawDetections(ref.current, results);
                    faceapi.draw.drawFaceLandmarks(ref.current, results);
                    faceapi.draw.drawFaceExpressions(ref.current, results);

                }
            })();
            setRect(state.user_video_element.getBoundingClientRect());

            requestAnimationFrame(run);
        }

        requestAnimationFrame(run);



    }, [state.user_video_stream])

    const style = {
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height
    }

    return (
        <canvas
            width={state.user_video_element?.videoWidth}
            height={state.user_video_element?.videoHeight}
            style={style}
            ref={ref} id={"user-video-overlay"}/>
    )
};