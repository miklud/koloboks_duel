/**
 * @param {{[string]: Function}} ctxFns
 * @param {string} fnName
 * @param {Function} fn
 * @returns {void}
 */
export function fnTransferHandlerToContext(ctxFns, fnName, fn) {
  ctxFns[fnName] = function (propName) {
    fn(propName);
  };
}
