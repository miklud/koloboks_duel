// ===
// import
// ===
import { fnSetIsPause } from "./fnSetIsPause";

// ===
// main
// ===
/**
 * @param {{[string]: string | Function}} dispatcher
 * @param {{[string]: Function}} ctxFns
 * @param {boolean} isPlay
 * @returns {void}
 */
export function fnSetIsPlay(dispatcher, ctxFns, isPlay) {
  if (!dispatcher.isPlay) {
    dispatcher.isPlay = isPlay;
  } else {
    fnSetIsPause(dispatcher, !isPlay);
  }
  const visibility = isPlay ? "hidden" : "visible";
  window.setTimeout(() => ctxFns.fnSetGameTitle(visibility));
}
