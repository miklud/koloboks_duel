/**
 * @param {React.useState fn} reactSetter
 * @returns {Function}
 */
export function fnCloseColorPicker(dispatcher, reactSetter) {
  /**
   * @param {{[string]: string}} dispatcher
   * @returns {void}
   */
  return function () {
    reactSetter(false);
    dispatcher.isPause = false;
  };
}
