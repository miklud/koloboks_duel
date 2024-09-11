/**
 * @param {{[string]: string}} dispatcher
 * @param {boolean} isChanged
 * @returns {void}
 */
export function fnSetCircleVelocityChanged(dispatcher, isChanged) {
  dispatcher.circleVelocityChanged = isChanged;
}
