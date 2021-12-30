import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "../App.css";

function Paint() {
    //basically refs allow you to use raw html elements and methods
    //access the raw dom itself instead of just using react's virtual dom
    //in case you wanna build something a little custom
    //creates a ref to store the canvasRef DOM element
    const canvasRef = useRef(null);   
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(0.1);
    const [isStylus, setIsStylus] = useState(false);

    // Initialization when the component
    // mounts for the first time
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);

    // Function for starting the drawing
    const startDrawing = (e) => {
        //weird bug where if you just press down, nothing happens   
        console.log(e);
        ctxRef.current.beginPath(); //beginPath is an html method used for 2d context to draw stuff on a canvas 
        if(e._reactName == 'onMouseDown') {
            console.log(e.nativeEvent.offsetY)
            ctxRef.current.moveTo(
                e.nativeEvent.offsetX,
                e.nativeEvent.offsetY
            );
        }
        if(e._reactName == 'onTouchStart') {
            console.log('hiii')
            console.log(e.nativeEvent.touches[0].pageY)
            //courtesy of
            //https://stackoverflow.com/questions/33548926/how-to-detect-touchmove-length-offsets
            var touch = e.touches[0] || e.changedTouches[0];
            var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
            var offsetX = touch.clientX - realTarget.getBoundingClientRect().x;
            var offsetY = touch.clientY - realTarget.getBoundingClientRect().y

            ctxRef.current.moveTo(
                offsetX,
                offsetY
            );
        }
        setIsDrawing(true);
    };

    // Function for ending the drawing
    const endDrawing = (e) => {
        console.log(e);
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (e) => {
        //console.log(e);
        if (!isDrawing) {
            return;
        }
        
        if(e._reactName == 'onMouseMove') {
            ctxRef.current.lineTo(
                e.nativeEvent.offsetX,
                e.nativeEvent.offsetY
            );
        }
        if(e._reactName == 'onTouchMove') {
            var touch = e.touches[0] || e.changedTouches[0];
            var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
            var offsetX = touch.clientX - realTarget.getBoundingClientRect().x;
            var offsetY = touch.clientY - realTarget.getBoundingClientRect().y

            ctxRef.current.lineTo(
                offsetX,
                offsetY
            );
        }
        ctxRef.current.stroke();

    };


    return (
        <div className="Paint">
            <h1>Paint App</h1>
            <div className="draw-area">
                <Menu
                    setLineColor={setLineColor}
                    setLineWidth={setLineWidth}
                    setLineOpacity={setLineOpacity}
                />
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={draw}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={endDrawing}
                    ref={canvasRef}
                    width={`1280px`}
                    height={`720px`}
                />
            </div>
        </div>
    );
}

export default Paint;


/* problem I had with touch with stylus

it would keep scrolling instead of touching, so i used these links to help solve the problem

https://stackoverflow.com/questions/48760369/how-to-stop-scrolling-only-on-using-pen-stylus-and-not-on-finger-touch (tried this at first)
https://stackoverflow.com/questions/42101723/unable-to-preventdefault-inside-passive-event-listener (ended up using this)

*/