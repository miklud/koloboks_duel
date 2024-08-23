// ===
// import
// ===
import React from "react";
import styled from "@emotion/styled";
import Box from "./Box";
import Header from "./Header";
import KolobokVelocitySlider from "./KolobokVelocitySlider";
import BulletsVelocitySlider from "./BulletsVelocitySlider";

// ===
// main
// ===
const KolobokMenu = function KolobokMenu(props) {
  const kolobokName = props.whois === "left" ? "Левый" : "Правый";

  // ---
  // JSX
  // ---
  return (
    <Box
      className={`${props.whois === "left" ? "Left" : "Right"}KolobokMenu ${
        props.className
      }`}
    >
      <Header hN={2} sx={{ marginTop: "1em", marginBottom: "1em" }}>
        {kolobokName} Колобок
      </Header>
      <KolobokVelocitySlider
        sx={{ marginBottom: "3em" }}
        className={props.whois === "left" ? "LKM_KVS" : "RKM_KVS"}
        whois={props.whois}
      />
      <BulletsVelocitySlider
        className={props.whois === "left" ? "LKM_BVS" : "RKM_BVS"}
        whois={props.whois}
      />
    </Box>
  );
};

// ===
// styled
// ===
const StyledKolobokMenu = styled(KolobokMenu)((props) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1em",
    color: "#343a40",
  };
});

// ===
// export
// ===
export default StyledKolobokMenu;
