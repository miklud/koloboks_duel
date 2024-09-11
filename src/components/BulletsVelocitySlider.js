// ===
// import
// ===
import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import { useMainContext } from "../context/ContextProvider";
import { fnBulletsFrequency } from "../lib";

// ===
// main
// ===
const BulletsVelocitySlider = function BulletsVelocitySlider(props) {
  const [val, setVal] = React.useState(3);

  // ---
  // context
  // ---
  const { dispatcher } = useMainContext();

  // ---
  // handlers
  // ---
  const onChangeHandler = (e) => {
    setVal(Number(e.target.value));
    fnBulletsFrequency(dispatcher, {
      circleID: props.whois,
      newBulletsFrequency: e.target.value,
    });
  };

  // ---
  // JSX
  // ---
  return (
    <div
      className={`BulletsVelocitySlider_wrapper 
        ${props.className}`}
    >
      <form className="BVS_form">
        <Header hN={4} className="BVS_title">
          Частота стрельбы
        </Header>
        <div className="BVS_slider">
          <input
            type="radio"
            name="velocity"
            id={`1${props.className}`}
            value="1"
            required
            checked={val === 1}
            onChange={onChangeHandler}
          />
          <label htmlFor={`1${props.className}`} data-velocity="1"></label>

          <input
            type="radio"
            name="velocity"
            id={`2${props.className}`}
            value="2"
            required
            checked={val === 2}
            onChange={onChangeHandler}
          />
          <label htmlFor={`2${props.className}`} data-velocity="2"></label>

          <input
            type="radio"
            name="velocity"
            id={`3${props.className}`}
            value="3"
            required
            checked={val === 3}
            onChange={onChangeHandler}
          />
          <label htmlFor={`3${props.className}`} data-velocity="3"></label>

          <input
            type="radio"
            name="velocity"
            id={`4${props.className}`}
            value="4"
            required
            checked={val === 4}
            onChange={onChangeHandler}
          />
          <label htmlFor={`4${props.className}`} data-velocity="4"></label>

          <input
            type="radio"
            name="velocity"
            id={`5${props.className}`}
            value="5"
            required
            checked={val === 5}
            onChange={onChangeHandler}
          />
          <label htmlFor={`5${props.className}`} data-velocity="5"></label>

          <div className="BVS_pos"></div>
        </div>
      </form>
    </div>
  );
};

// ===
// styled
// ===
const Styled = styled(BulletsVelocitySlider)((props) => {
  // ---
  // CSSObject
  // ---
  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& .BVS_form": {
      width: "90%",
      // maxWidth: "500px",
      maxWidth: "31.25em",
    },

    "& .BVS_title": {
      textAlign: "center",
      marginBottom: "1em",
    },

    "& .BVS_slider": {
      display: "flex",
      flexDirection: "row",
      alignContent: "stretch",
      position: "relative",
      width: "100%",
      // height: "50px",
      height: "3.125em",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
    },

    "& .BVS_slider::before": {
      content: "' '",
      position: "absolute",
      // height: "2px",
      height: "0.125em",
      width: "calc(100% * (4 / 5))",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#000",
    },

    "& .BVS_slider input, & .BVS_slider label": {
      boxSizing: "border-box",
      flex: 1,
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
      cursor: "pointer",
    },

    "& .BVS_slider label": {
      display: "inline-block",
      position: "relative",
      width: "20%",
      height: "100%",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
    },

    "& .BVS_slider label::before": {
      content: "attr(data-velocity)",
      position: "absolute",
      left: "50%",
      // paddingTop: "10px",
      paddingTop: "0.625em",
      // transform: "translate(-50%, 45px)",
      transform: "translate(-50%, 2.8125em)",
      // fontSize: "16px",
      fontSize: "1em",
      // letterSpacing: "0.4px",
      letterSpacing: "0.025em",
      fontweight: 400,
      whiteSpace: "nowrap",
      opacity: 0.85,
      transition: "all 0.15s ease-in-out",
    },

    "& .BVS_slider label::after": {
      content: "' '",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      // width: "20px",
      width: "1.25em",
      // height: "20px",
      height: "1.25em",
      // border: "2px solid #000",
      border: "0.125em solid #000",
      background: "#fff",
      borderRadius: "50%",
      pointerEvents: "none",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
      zIndex: 1,
      cursor: "cpointer",
      transition: "all 0.15s ease-in-out",
    },

    "& .BVS_slider label:hover::after": {
      transform: "translate(-50%, -50%) scale(1.25)",
    },

    "& .BVS_slider input": {
      display: "none",
    },

    "& .BVS_slider input:checked + label::before": {
      fontWeight: 800,
      opacity: 1,
    },

    "& .BVS_slider input:checked + label::after": {
      // borderWidth: "4px",
      borderWidth: "0.25em",
      transform: "translate(-50%, -50%) scale(0.75)",
    },

    "& .BVS_slider input:checked ~ .BVS_pos": {
      opacity: 1,
    },

    "& .BVS_slider input:checked:nth-child(1) ~ .BVS_pos": {
      left: "10%",
    },

    "& .BVS_slider input:checked:nth-child(3) ~ .BVS_pos": {
      left: "30%",
    },

    "& .BVS_slider input:checked:nth-child(5) ~ .BVS_pos": {
      left: "50%",
    },

    "& .BVS_slider input:checked:nth-child(7) ~ .BVS_pos": {
      left: "70%",
    },

    "& .BVS_slider input:checked:nth-child(9) ~ .BVS_pos": {
      left: "90%",
    },

    "& .BVS_slider .BVS_pos": {
      display: "block",
      position: "absolute",
      top: "50%",
      // width: "12px",
      width: "0.75em",
      // height: "12px",
      height: "0.75em",
      background: "#000",
      borderRadius: "50%",
      transition: "all 0.15s ease-in-out",
      transform: "translate(-50%, -50%)",
      // border: "2px solid #fff",
      border: "0.125em solid #fff",
      opacity: 0,
      zIndex: 2,
    },

    "& .BVS_form:valid .BVS_slider input + label::before": {
      // transform: "translate(-50%, 45px) scale(1)",
      transform: "translate(-50%, 2.8125em) scale(1)",
      transition: "all 0.15s linear",
    },

    "& .BVS_form:valid .BVS_slider input:checked + label::before": {
      // transform: "translate(-50%, 45px) scale(1.2)",
      transform: "translate(-50%, 2.8125em) scale(1.2)",
      transition: "all 0.15s linear",
    },
  };
});

// ===
// export
// ===
export default Styled;
