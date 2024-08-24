// ===
// import
// ===
import React, { useState } from "react";
import Box from "./Box";
import Header from "./Header";
import Play from "./Play";
import { useMainContext } from "../context/ContextProvider";
import styled from "@emotion/styled";

// ===
// main
// ===
const Scoreboard = function Scoreboard(props) {
  const [, setUpdate] = useState({});

  // ---
  // context
  // ---
  const { dispatcher } = useMainContext();

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
    dispatcher.fnSetScoresTransfer(fnUpdateScores);
  }, []);

  // ---
  // JSX
  // ---
  return (
    <Box className={`Scoreboard ${props.className}`}>
      {/* Left */}
      <Header hN={3} className="ScoreboardHeaderMain">
        Поразил цель:
      </Header>
      <Box className="ScoreboardWrapper">
        <Box className="ScoreboardLeft">
          <Header hN={2} className="ScoreboardHeaderScores">
            {dispatcher.scores.left}
          </Header>
          <Header hN={3}>Левый</Header>
        </Box>

        {/* Play */}
        <Play />

        {/* Right */}
        <Box className="ScoreboardRight">
          <Header hN={2} className="ScoreboardHeaderScores">
            {dispatcher.scores.right}
          </Header>
          <Header hN={3}>Правый</Header>
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

// ===
// export
// ===
export default StyledScoreboard;
