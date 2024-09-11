// ===
// import
// ===
import React from "react";
import JSCircle from "../classes/JSCircle";
import { useMainContext } from "../context/ContextProvider";
import { throttlify } from "../fns/throttlify";
import { animate } from "../fns/animate";
import {
  fnTransferFnToContext,
  fnSetMousePosition,
  fnSetIsClick,
  fnSetClickPosition,
} from "../lib";

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
  const { dispatcher, ctxFns, ctxUtils } = useMainContext();

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
  }); // **

  // ---
  // event handlers
  // ---
  const mouseMoveHandler = throttlify((event) => {
    fnSetMousePosition(dispatcher, event.clientX, event.clientY);
  });

  const mouseLeaveHandler = () => {
    fnSetMousePosition(dispatcher, 0, 0);
  };

  const clickHandler = (event) => {
    fnSetIsClick(dispatcher, true);
    fnSetClickPosition(dispatcher, event.clientX, event.clientY);
  };

  // ---
  // main run
  // ---
  if (canvasRef.current && !localStore.current.initLock) {
    localStore.current.initLock = true;
    const canvas = canvasRef.current;
    canvas.id = gCounters.canvas;
    gCounters.canvas++;

    const ctx = canvas.getContext("2d");

    const maxX = dispatcher.maxX;
    const maxY = dispatcher.maxY;
    canvas.width = maxX;
    canvas.height = maxY;
    const radius = 30;
    const number = 2;

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
      animate(ctx, circlesArr, maxX, maxY, dispatcher, ctxUtils, ctxFns)();
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

  /* Transfer fns to Context */
  React.useEffect(() => {
    if (canvasRef.current) {
      fnTransferFnToContext(
        ctxFns,
        "fnCanvasDim",
        (function fnCanvasDim(canvas) {
          return (width, height) => {
            canvas.width = width;
            canvas.height = height;
          };
        })(canvasRef.current)
      );
    }
  }, []);

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
