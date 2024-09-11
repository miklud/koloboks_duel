/**
 * @param {{[string]: Function}} ctxFns
 * @param {string} fnName
 * @param {Function} fn
 * @returns {void}
 */
export function fnTransferFnToContext(ctxFns, fnName, fn) {
  ctxFns[fnName] = fn;
}
