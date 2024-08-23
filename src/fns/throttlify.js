/**
 * Считывает положение мыши
// отсюда: https://dev.to/srele96/reactjs-mouse-move-throttle-hb3
 */

// ===
// constants
// ===
const DURATION = 200;

// ===
// pre-function
// ===
const throttle = (function () {
  let timeout = undefined;
  return function throttle(callback) {
    if (timeout === undefined) {
      callback();
      timeout = setTimeout(() => {
        // allow another call to be throttled
        timeout = undefined;
      }, DURATION);
    }
  };
})();

// ===
// main
// ===
/**
 * Wraps callback in a function and throttles it.
 * @returns Wrapper function
 */
export function throttlify(callback) {
  return function throttlified(event) {
    throttle(() => {
      callback(event);
    });
  };
}
