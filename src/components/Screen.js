// ===
// import
// ===
import React from "react";
import styled from "@emotion/styled";
import Box from "./Box";
import Canvas from "./Canvas";
import KolobokMenu from "./KolobokMenu";
import Scoreboard from "./Scoreboard";
import ColorPicker from "./ColorPicker";
import GameTitle from "./GameTitle";

// // ===
// // main
// // ===
function ScreenWrapper(props) {
  const [canvasDimensions, setCanvasDimensions] = React.useState({
    width: undefined,
    height: undefined,
  });

  // ---
  // refs
  // ---
  const canvasWrapperRef = React.useRef(null);

  // ---
  // effects
  // ---
  React.useEffect(() => {
    if (canvasWrapperRef.current) {
      setCanvasDimensions({
        width: canvasWrapperRef.current.clientWidth,
        height: canvasWrapperRef.current.clientHeight,
      });
    }
  }, []);

  // ---
  // JSX
  // ---
  return (
    <div className={`ScreenWrapper ${props.className}`}>
      <Box
        className="CanvasWrapper"
        ref={canvasWrapperRef}
        sx={{ bg: "#ccd5ae", position: "relative" }}
      >
        <Box
          className="CanvasBlock"
          sx={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Canvas dim={canvasDimensions} />
          <GameTitle />
        </Box>
        <ColorPicker />
      </Box>
      <Box
        className="MenuWrapper"
        sx={{ display: "grid", gridTemplateRows: "2fr 1fr 2fr", bg: "#faedcd" }}
      >
        <KolobokMenu whois="left" />
        <Scoreboard />
        <KolobokMenu whois="right" />
      </Box>
    </div>
  );
}

// ===
// styled
// ===
const Screen = styled(ScreenWrapper)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  overflow: hidden;
`;

// // ===
// // export
// // ===
export default Screen;
