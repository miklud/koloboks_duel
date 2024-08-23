// ===
// import
// ===
import React from "react";
import JSCircle from "../classes/JSCircle";
// import { wrk } from "..";
import { useMainContext } from "../context/ContextProvider";
import { throttlify } from "../fns/throttlify";
// import { createMousePosition } from "../fns/createMousePosition";
import { animate } from "../fns/animate";

// ===
// counters
// ===
const gCounters = {
  canvas: 0,
};

// ===
// main
// ===
function Canvas(props) {
  const [, setUpdate] = React.useState({});

  // ---
  // context
  // ---
  const { dispatcher } = useMainContext();

  // ---
  // refs
  // ---
  const canvasRef = React.useRef(null);

  // ---
  // local store
  // ---
  const localStore = React.useRef({
    isReadyToStart: false,
    isAnimated: false,
    initLock: false,
  }); //<<

  // ---
  // event handlers
  // ---
  const mouseMoveHandler = throttlify((event) => {
    dispatcher.fnSetMousePosition(event.clientX, event.clientY);
  });

  const mouseLeaveHandler = () => {
    dispatcher.fnSetMousePosition(0, 0);
  };

  const clickHandler = (event) => {
    dispatcher.fnSetIsClick(true);
    dispatcher.fnSetClickPosition(event.clientX, event.clientY);
  };

  // ---
  // main run
  // ---
  if (canvasRef.current) {
    const canvas = canvasRef.current;
    canvas.id = gCounters.canvas;
    gCounters.canvas++;
    canvas.width = props.dim.width ? props.dim.width : undefined;
    canvas.height = props.dim.height ? props.dim.height : undefined;

    const ctx = canvas.getContext("2d");

    const maxX = canvas.width;
    const maxY = canvas.height;
    const radius = 30;
    const number = 2;

    localStore.current.maxX = maxX;
    localStore.current.maxY = maxY;

    const circlesArr = [];

    for (let i = 0; i < number; i++) {
      circlesArr.push(
        new JSCircle({
          ctx,
          radius,
          id: i % 2 ? "left" : "right",
          maxX,
          maxY,
        })
      );
    }

    // control animation
    if (localStore.current.isReadyToStart && !localStore.current.isAnimated) {
      animate(ctx, circlesArr, maxX, maxY, dispatcher)();
      localStore.current.isAnimated = true;
      localStore.current.isReadyToStart = false;
    }
  }

  // ---
  // Effects
  // ---
  React.useEffect(() => {
    (function startLoop() {
      window.setTimeout(() => {
        if (dispatcher.isPlay) {
          setUpdate({});
          localStore.current.isReadyToStart = true;
        } else {
          startLoop();
        }
      }, 1000);
    })();
  }, [dispatcher.isPlay]);

  // ---
  // JSX
  // ---
  return (
    <canvas
      ref={canvasRef}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={clickHandler}
      style={{ overflow: "hidden" }}
    >
      Игра не работает в Вашей версии браузера
    </canvas>
  );
}

// ===
// export
// ===
export default Canvas;
