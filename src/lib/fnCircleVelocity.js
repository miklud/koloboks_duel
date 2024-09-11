/**
 * @param {{[string]: string}} dispatcher
 * @param {{circleID: string, newCircleVelocity: string}} props
 * @returns {void}
 */
export function fnCircleVelocity(dispatcher, props) {
  dispatcher.circleVelocityChanged = true;
  dispatcher.circleID = props.circleID;
  dispatcher.newCircleVelocity = props.newCircleVelocity;
}
