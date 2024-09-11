/**
 * @param {{[string]: string}} dispatcher
 * @param {boolean} isPause
 * @returns {void}
 */
export function fnSetIsPause(dispatcher, isPause) {
  dispatcher.isPause = isPause;
}
