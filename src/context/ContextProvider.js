// ===
// import
// ===
import React from "react";
import { createMousePosition } from "../fns/createMousePosition";
import {
  fnColorPickerOpen,
  fnCloseColorPicker,
  fnSetWinDimensions,
} from "../lib";

// ===
// constants
// ===
const CSS_MARGIN_STANDARD = 16;
const CSS_ZOOMING_KEF = 1.1;

// ===
// create context
// ===
const MainContext = React.createContext();
export const useMainContext = () => React.useContext(MainContext);

// ===
// prelude
// ===
// const [winWidthRaw, winHeightRaw] = [window.innerWidth, window.innerHeight];
// const winWidth = winWidthRaw - CSS_MARGIN_STANDARD * CSS_ZOOMING_KEF;
// const winHeight = winHeightRaw - CSS_MARGIN_STANDARD * CSS_ZOOMING_KEF;

// ===
// main
// ===
export default function ContextProvider({ children, appRef }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);

  // ---
  // dispatcher
  // ---
  const dispatcherRef = React.useRef({
    // appW: 0,
    // appH: 0,
    appRef: null,
    appMargin: CSS_MARGIN_STANDARD,
    appKef: CSS_ZOOMING_KEF,
    scores: { left: 0, right: 0 },
    circleVelocityChanged: false,
    circleID: undefined,
    newCircleVelocity: undefined,
    bulletsFrequencyChanged: false,
    newBulletsFrequency: undefined,
    mousePosition: createMousePosition(0, 0),
    clickPosition: createMousePosition(0, 0),
    circleClickedID: undefined,
    circleClickedCurrentColor: undefined,
    isClick: false,
    isPause: false,
    isColorChanged: false,
    isPlay: false,
    maxX: 0,
    maxY: 0,
  });
  const dispatcher = dispatcherRef.current;

  // ---
  // context functions (space name)
  // ---
  const ctxFnsRef = React.useRef({
    fnSetGameTitle: () => {},
    fnSetScores: () => {},
    fnCanvasDim: () => {},
  });
  const ctxFns = ctxFnsRef.current;

  // ---
  // context utils (space name)
  // ---
  const ctxUtils = {
    uColorPickerOpen: fnColorPickerOpen(setIsColorPickerOpen),
    uColorPickerClose: fnCloseColorPicker(dispatcher, setIsColorPickerOpen),
  };

  // ---
  // effects
  // ---
  React.useEffect(() => {
    const fn = fnSetWinDimensions(dispatcher, ctxFns, "fnCanvasDim");
    window.addEventListener("resize", fn);

    fn(dispatcher.appW, dispatcher.appH);

    return () => window.removeEventListener("resize", fn);
  }, [dispatcher, ctxFns]);

  // ---
  // JSX
  // ---
  return (
    <MainContext.Provider
      value={{
        dispatcher,
        isColorPickerOpen,
        ctxFns,
        ctxUtils,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
