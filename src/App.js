// ===
// import
// ===
import "./App.css";
import Screen from "./components/Screen";
import * as React from "react";
import { fnAppDimensions } from "./lib";
import { useMainContext } from "./context/ContextProvider";

// ===
// main
// ===
function App() {
  // ---
  // constext
  // ---
  const { dispatcher } = useMainContext();

  // ---
  // refs
  // ---
  const ref = React.useRef(null);

  // ---
  // effects
  // ---
  React.useEffect(() => {
    // fnAppDimensions(dispatcher, ref);
    dispatcher.appRef = ref.current;
    // eslint-disable-next-line
  }, []);

  // ---
  // JSX
  // ---
  return (
    <div className="App" ref={ref}>
      <Screen />
    </div>
  );
}

// ===
// export
// ===
export default App;
