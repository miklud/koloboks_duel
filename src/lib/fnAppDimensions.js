/**
 *
 * @param {{[string]: string}: string} dispatcher
 * @param {React.Node} ref
 * @returns {[number, number]}
 */
export function fnAppDimensions(dispatcher) {
  const correction = dispatcher.appMargin * dispatcher.appKef;
  return [
    dispatcher.appRef.clientWidth - correction,
    dispatcher.appRef.clientHeight - correction,
  ];
}
