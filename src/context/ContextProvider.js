// ===
// import
// ===
import React from "react";
import { createMousePosition } from "../fns/createMousePosition";

// ===
// create context
// ===
const MainContext = React.createContext();
export const useMainContext = () => React.useContext(MainContext);

// ===
// main
// ===
export default function ContextProvider({ children }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);

  // ---
  // dispatcher
  // ---
  const dispatcherRef = React.useRef({
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
    fnColorPickerOpen: () => {},
    fnCirlceVelocity: () => {},
    fnBulletsFrequency: () => {},
    fnCloseColorPicker: () => {},
    fnSetMousePosition: () => {},
    fnSetClickPosition: () => {},
    fnSetIsClick: () => {},
    fnSetIsPause: () => {},
    fnSetCircleClickedID: () => {},
    fnSetCircleVelocityChanged: () => {},
    fnSetIsColorChanged: () => {},
    fnSetIsPlay: () => {},
    fnSetScoresTransfer: () => {},
    fnSetScores: () => {},
    fnTransferHandlerToContext: () => {},
    fnSetGameTitle: () => {},
  });

  // ---
  // add to dispatcher
  // ---
  const dispatcher = dispatcherRef.current;
  dispatcher.fnColorPickerOpen = _fnColorPickerHandler(setIsColorPickerOpen);
  dispatcher.fnCirlceVelocity = _fnChangeDispatcherCircleData();
  dispatcher.fnBulletsFrequency = _fnChangeDispatcherBulletsData();
  dispatcher.fnCloseColorPicker =
    _fnCloseAndDeletePause(setIsColorPickerOpen).bind(dispatcher);
  dispatcher.fnSetMousePosition = _fnSetMousePosition();
  dispatcher.fnSetClickPosition = _fnSetClickPosition();
  dispatcher.fnSetIsClick = _fnSetIsClick();
  dispatcher.fnSetIsPause = _fnSetIsPause();
  dispatcher.fnSetCircleClickedID = _fnSetCircleClickedID();
  dispatcher.fnSetCircleVelocityChanged = _fnSetCircleVelocityChanged();
  dispatcher.fnSetIsColorChanged = _fnSetIsColorChanged();
  dispatcher.fnSetIsPlay = _fnSetIsPlay();
  dispatcher.fnSetScoresTransfer = _fnSetScoresTransfer();
  dispatcher.fnTransferHandlerToContext = _fnTransferHandlerToContext();

  // ---
  // JSX
  // ---
  return (
    <MainContext.Provider
      value={{
        dispatcher,
        isColorPickerOpen,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

// ===
// functions
// ===
function _fnChangeDispatcherCircleData() {
  return function fnCirlceVelocity(props) {
    this.circleVelocityChanged = true;
    this.circleID = props.circleID;
    this.newCircleVelocity = props.newCircleVelocity;
  };
} //<<

// ---
function _fnChangeDispatcherBulletsData() {
  return function fnBulletsFrequency(props) {
    this.bulletsFrequencyChanged = true;
    this.circleID = props.circleID;
    this.newBulletsFrequency = props.newBulletsFrequency;
  };
} //<<

// ---
function _fnCloseAndDeletePause(setIsColorPickerOpen) {
  return function fnCloseColorPicker() {
    setIsColorPickerOpen(false);
    this.isPause = false;
  };
} //<<

// ---
function _fnColorPickerHandler(setIsColorPickerOpen) {
  return function fnColorPickerOpen(circleID, currentColor) {
    setIsColorPickerOpen(true);
    this.circleClickedID = circleID;
    this.circleClickedCurrentColor = currentColor;
  };
} //<<

// ---
function _fnSetMousePosition() {
  return function fnSetMousePosition(x, y) {
    this.mousePosition = createMousePosition(x, y);
  };
} //<<

// ---
function _fnSetClickPosition() {
  return function fnSetClickPosition(x, y) {
    this.clickPosition = createMousePosition(x, y);
  };
} //<<

// ---
function _fnSetIsClick() {
  return function fnSetIsClick(isClick) {
    this.isClick = isClick;
  };
} //<<

// ---
function _fnSetIsPause() {
  return function fnSetIsPause(isPause) {
    this.isPause = isPause;
  };
} //<<

// ---
function _fnSetCircleClickedID() {
  return function fnSetCircleClickedID(id) {
    this.circleClickedID = id;
  };
} //<<

// ---
function _fnSetCircleVelocityChanged() {
  return function fnSetCircleVelocityChanged(isChanged) {
    this.circleVelocityChanged = isChanged;
  };
} //<<

// ---
function _fnSetIsColorChanged() {
  return function fnSetIsColorChanged(isChanged, color = undefined) {
    this.isColorChanged = isChanged;
    if (color) {
      this.circleClickedCurrentColor = color;
    }
  };
} //<<

// ---
function _fnSetIsPlay() {
  return function fnSetIsPlay(isPlay) {
    if (!this.isPlay) {
      this.isPlay = isPlay;
    } else {
      this.fnSetIsPause(!isPlay);
    }
    const visibility = isPlay ? "hidden" : "visible";
    window.setTimeout(() => this.fnSetGameTitle(visibility));
  };
} //<<

// ---
function _fnSetScoresTransfer() {
  return function fnSetScoresTransfer(callback) {
    this.fnSetScores = function fnSetScores(scores) {
      this.scores = scores;
      callback();
    };
  };
} //<<

// ---
function _fnTransferHandlerToContext() {
  return function fnTransferHandlerToContext(fnName, fn) {
    this[fnName] = function (propName) {
      fn(propName);
    };
  };
} //<<
