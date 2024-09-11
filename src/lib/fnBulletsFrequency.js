/**
 * @param {{[string]: string}} dispatcher
 * @param {{circleID: string, newBulletsFrequency: string}} props
 * @returns {void}
 */
export function fnBulletsFrequency(dispatcher, props) {
  dispatcher.bulletsFrequencyChanged = true;
  dispatcher.circleID = props.circleID;
  dispatcher.newBulletsFrequency = props.newBulletsFrequency;
}
