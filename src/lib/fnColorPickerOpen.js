/**
 *
 * @param {React.useState fn} reactSetter
 * @returns {Function}
 */
export function fnColorPickerOpen(reactSetter) {
  /**
   * @param {{[string]: string}} dispatcher
   * @param {"left" | "right"} circleID
   * @param {string} currentColor
   * @returns {void}
   */
  return function (dispatcher, circleID, currentColor) {
    reactSetter(true);
    dispatcher.circleClickedID = circleID;
    dispatcher.circleClickedCurrentColor = currentColor;
  };
}
