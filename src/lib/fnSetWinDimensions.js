// ===
// import
// ===
import { fnAppDimensions } from "../lib";

/**
 *
 * @param {{[string]: string}} dispatcher
 * @param {{[string]: Function}} ctxFns
 * @param {React.useState fn} reactSetter
 * @returns {Function}
 */
export function fnSetWinDimensions(dispatcher, ctxFns, fnName) {
  /**
   * @returns {void}
   */
  return function fnSetWinDim() {
    const [appW, appH] = fnAppDimensions(dispatcher);
    const width = appW * (3 / 4);
    const height = appH;

    ctxFns[fnName](width, height);
    dispatcher.maxX = width;
    dispatcher.maxY = height;
  };
}
