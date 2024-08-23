// ==========
// import
// ==========
import { mainWorker } from "./mainWorker";

// ==========
// main
// ==========
export function initWorker() {
  const code = mainWorker.toString();
  const blob = new Blob([`(${code})()`]);
  return new Worker(URL.createObjectURL(blob));
}
