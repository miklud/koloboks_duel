// ===
// import
// ===
import React, { useState } from "react";
import Box from "./Box";
import Header from "./Header";
import Play from "./Play";
import { useMainContext } from "../context/ContextProvider";
import styled from "@emotion/styled";
import { fnSetScoresTransfer } from "../lib";

// ===
// main
// ===
const Scoreboard = function Scoreboard(props) {
  const [, setUpdate] = useState({});

  // ---
  // context
  // ---
  const { dispatcher, ctxFns } = useMainContext();

  // ---
  // handler
  // ---
  const fnUpdateScores = () => {
    setUpdate({});
  };

  // ---
  // effects
  // ---
  React.useEffect(() => {
    fnSetScoresTransfer(dispatcher, ctxFns, fnUpdateScores);
    // eslint-disable-next-line
  }, []);

  // ---
  // JSX
  // ---
  return (
    <Box className={`Scoreboard ${props.className}`}>
      {/* Left */}
      <StyledHeader hN={3} className="ScoreboardHeaderMain">
        Поразил цель:
      </StyledHeader>
      <Box className="ScoreboardWrapper">
        <Box className="ScoreboardLeft">
          <Header hN={2} className="ScoreboardHeaderScores">
            {dispatcher.scores.left}
          </Header>
          <StyledHeader hN={3}>Левый</StyledHeader>
        </Box>

        {/* Play */}
        <Play />

        {/* Right */}
        <Box className="ScoreboardRight">
          <Header hN={2} className="ScoreboardHeaderScores">
            {dispatcher.scores.right}
          </Header>
          <StyledHeader hN={3}>Правый</StyledHeader>
        </Box>
      </Box>
    </Box>
  );
};

// ===
// styled
// ===
const StyledScoreboard = styled(Scoreboard)((props) => {
  return {
    backgroundColor: "#d4a373",
    color: "#343a40",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "& .ScoreboardLeft, & .ScoreboardRight": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    "& .ScoreboardWrapper": {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 2fr",
    },

    "& .ScoreboardHeaderMain": {
      "@media screen and (max-height: 768px)": {
        marginBottom: "0.5em",
      },
    },

    "& .ScoreboardHeaderScores": {
      fontSize: "6em",
    },
  };
});

const StyledHeader = styled(Header)(() => {
  return {
    "@media screen and (width > 1366px) and (620px < height < 768px)": {
      fontSize: "2em",
    },
  };
});

// ===
// export
// ===
export default StyledScoreboard;
