// ===
// import
// ===
import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import { useMainContext } from "../context/ContextProvider";
import { fnCircleVelocity } from "../lib";

// ===
// main
// ===
const KolobokVelocitySlider = function KolobokVelocitySlider(props) {
  const [val, setVal] = React.useState(5);

  // ---
  // context
  // ---
  const { dispatcher } = useMainContext();

  // ---
  // handlers
  // ---
  const onChangeHandler = (e) => {
    setVal(e.target.value);
    window.setTimeout(() => {
      fnCircleVelocity(dispatcher, {
        circleID: props.whois,
        newCircleVelocity: e.target.value,
      });
    }, 200);
  };

  // ---
  // JSX
  // ---
  return (
    <div className={`KolobokVelocitySlider_wrapper ${props.className}`}>
      <Header hN={4} className="KVS_title">
        Скорость колобка
      </Header>
      <div className="KVS_value">{val}</div>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={val}
        onChange={onChangeHandler}
        className="KVS_input"
      />
    </div>
  );
};

// ===
// styled
// ===
const Styled = styled(KolobokVelocitySlider)((props) => {
  const sx = props.sx ? props.sx : null;
  const thumbColor = "#588157";
  const thumbHoverColor = "#e9edc9";

  // ---
  // CSSObject
  // ---
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: sx && sx.marginBottom ? sx.marginBottom : 0,

    "& .KVS_value": {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "4em",
      lineHeight: "1.4",
      letterSpacing: "-.07em",

      "@media screen and (max-height: 1080px)": {
        fontSize: "3em",
        marginTop: "0.3em",
        marginBottom: "0.3em",
      },
    },

    "& .KVS_input": {
      display: "block",
      "-webkit-appearance": "none",
      backgroundColor: "#bdc3c7",
      width: "200px",
      height: "5px",
      borderRadius: "5px",
      margin: "0 auto",
      outline: 0,
    },

    "& .KVS_input::-webkit-slider-thumb": {
      "-webkit-appearance": "none",
      backgroundColor: thumbColor,
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      border: "2px solid white",
      cursor: "pointer",
      transition: ".3s ease-in-out",
    },

    "& .KVS_input::-moz-range-thumb": {
      backgroundColor: thumbColor,
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      border: "2px solid white",
      cursor: "pointer",
      transition: ".3s ease-in-out",
    },

    "& .KVS_input::-webkit-slider-thumb:hover": {
      backgroundColor: thumbHoverColor,
      border: `2px solid ${thumbColor}`,
    },

    "& .KVS_input::-moz-range-thumb:hover": {
      backgroundColor: thumbHoverColor,
      border: `2px solid ${thumbColor}`,
    },

    "& .KVS_input::-webkit-slider-thumb:active": {
      transform: "scale(1.3)",
    },

    "& .KVS_input::-moz-range-thumb:hover:active": {
      transform: "scale(1.3)",
    },
  };
});

// ===
// export
// ===
export default Styled;
