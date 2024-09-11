// ===
// import
// ===
import React from "react";
import Box from "./Box";
import { useMainContext } from "../context/ContextProvider";
import { FaRegCirclePlay } from "react-icons/fa6";
import styled from "@emotion/styled";
import Header from "./Header";
import { fnTransferHandlerToContext } from "../lib";

// ===
// main
// ===
const GameTitle = function GameTitle(props) {
  const [visibility, setVisibility] = React.useState("visible");
  // ---
  // context
  // ---
  const { ctxFns } = useMainContext();

  // ---
  // hanlder
  // ---
  const changeVisibility = (arg) => {
    setVisibility(arg);
  };

  // ---
  // effect
  // ---
  React.useEffect(() => {
    fnTransferHandlerToContext(ctxFns, "fnSetGameTitle", changeVisibility);

    return () => {
      delete ctxFns["fnSetGameTitle"];
    };
    // eslint-disable-next-line
  }, []);

  // ---
  // pre-render
  // ---
  const opacity = visibility === "visible" ? 1 : 0;

  // ---
  // JSX
  // ---
  return (
    <Box
      className={`GameTitle ${props.className}`}
      sx={{
        visibility: visibility,
        opacity: opacity,
        transition: "0.3s visibility, 0.3s opacity",
      }}
    >
      <Box className="GameTitleWrapper">
        <StyledGameTitleHeader hN={1} className="GameTitle_Header">
          Дуэль Колобков
        </StyledGameTitleHeader>
        {/* <p className="GameTitle_Prompt">
          Нажмите{" "}
          <span className="GameTitle_Icon">
            <FaRegCirclePlay />
          </span>
        </p> */}
        <StyledPrompt className="GameTitle_Prompt">
          Нажмите{" "}
          <span className="GameTitle_Icon">
            <FaRegCirclePlay />
          </span>
        </StyledPrompt>
      </Box>
    </Box>
  );
};

// ===
// styled
// ===
const StyledGameTitle = styled(GameTitle)((props) => {
  return {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& .GameTitle_Header": {
      textTransform: "uppercase",
      fontSize: "4em",
      color: "#4C572A",
    },

    "& .GameTitle_Prompt": {
      display: "flex",
      justifyContent: "center",
      gap: "0.5em",
      fontSize: "1.2em",
    },

    "& .GameTitle_Icon": {
      transform: "translateY(2px)",
    },
  };
});

const StyledGameTitleHeader = styled(Header)(() => {
  return {
    "@media screen and (width > 1366px) and (620px < height < 768px)": {
      "&.GameTitle_Header": {
        fontSize: "6em",
      },
    },
  };
});

const StyledPrompt = styled("p")(() => {
  return {
    "@media screen and (width > 1366px) and (620px < height < 768px)": {
      "&.GameTitle_Prompt": {
        fontSize: "2em",
      },
    },
  };
});

// ===
// export
// ===
export default StyledGameTitle;
