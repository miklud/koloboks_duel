// ===
// import
// ===
import React from "react";
import Box from "./Box";
import { useMainContext } from "../context/ContextProvider";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import styled from "@emotion/styled";
import { fnSetIsPlay } from "../lib";

// ===
// constants
// ===
const PLAY_COLOR = "#588157";
const PAUSE_COLOR = "#bc4749";

// ===
// main
// ===
const Play = function Play(props) {
  const [isPlay, setIsPlay] = React.useState(false);

  // ---
  // context
  // ---
  const { dispatcher, ctxFns } = useMainContext();

  // ---
  // hanlder
  // ---
  const handleClick = () => {
    setIsPlay((old) => {
      const t = !old;
      // dispatcher.fnSetIsPlay(t);
      fnSetIsPlay(dispatcher, ctxFns, t);
      return t;
    });
  };

  // ---
  // JSX
  // ---
  return (
    <Box className={`Play ${props.className}`}>
      <Box className="PlayWrapper">
        <button className="PlayButton" onClick={handleClick}>
          {!isPlay && (
            <FaRegCirclePlay
              size="4em"
              color={`${!isPlay ? PLAY_COLOR : undefined}`}
            />
          )}
          {isPlay && (
            <FaRegCirclePause
              size="4em"
              color={`${isPlay ? PAUSE_COLOR : undefined}`}
            />
          )}
        </button>
      </Box>
    </Box>
  );
};

// ===
// styled
// ===
const StyledPlay = styled(Play)((props) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& .PlayWrapper": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    "& .PlayButton": {
      backgroundColor: "transparent",
      color: "red",
      border: 0,
      width: "100%",
      height: "100%",
      cursor: "pointer",
    },
  };
});

// ===
// export
// ===
export default StyledPlay;
