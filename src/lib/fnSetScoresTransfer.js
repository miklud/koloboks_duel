/**
 * @param {{[string]: string}} dispatcher
 * @param {{[string]: Function}} ctxFns
 * @param {Function} fn
 * @returns {void}
 */
export function fnSetScoresTransfer(dispatcher, ctxFns, fn) {
  ctxFns.fnSetScores = function fnSetScores(scores) {
    dispatcher.scores = scores;
    fn();
  };
}
