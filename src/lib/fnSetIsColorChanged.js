/**
 * @param {{[string]: string}} dispatcher
 * @param {boolean} isChanged
 * @param {string | undefined} color
 * @returns {void}
 */
export function fnSetIsColorChanged(dispatcher, isChanged, color = undefined) {
  dispatcher.isColorChanged = isChanged;
  if (color) {
    dispatcher.circleClickedCurrentColor = color;
  }
}
