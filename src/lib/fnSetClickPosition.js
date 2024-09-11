// ===
// import
// ===
import { createMousePosition } from "../fns/createMousePosition";

// ===
// main
// ===
/**
 * @param {{[string]: string}} dispatcher
 * @param {number} x
 * @param {number} y
 * @returns {void}
 */
export function fnSetClickPosition(dispatcher, x, y) {
  dispatcher.clickPosition = createMousePosition(x, y);
}
