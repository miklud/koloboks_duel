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
export function fnSetMousePosition(dispatcher, x, y) {
  dispatcher.mousePosition = createMousePosition(x, y);
}
