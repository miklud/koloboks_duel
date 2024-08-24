// ===
// import
// ===
import React from "react";
import styled from "@emotion/styled";
import { IoMdClose } from "react-icons/io";
import Header from "./Header";
import { useMainContext } from "../context/ContextProvider";

// ===
// main
// ===
const ColorPicker = function ColorPicker(props) {
  // ---
  // context
  // ---
  const { dispatcher, isColorPickerOpen } = useMainContext();

  // ---
  // local state
  // ---
  const [color, setColor] = React.useState(
    dispatcher.circleClickedCurrentColor
  );

  // ---
  // handlers
  // ---
  const handleColorChange = (event) => {
    setColor(event.target.value);
    dispatcher.fnSetIsColorChanged(true, event.target.value);
  };

  // ---
  // pre-render
  // ---
  const kolobokName =
    dispatcher.circleClickedID === "left" ? "Левый" : "Правый";

  // ---
  // JSX
  // ---
  return (
    <>
      {isColorPickerOpen && (
        <div className={`ColorPicker ${props.className}`}>
          <div className="ColorPickerWrapper">
            <div className="ColorPickerContent">
              <div className="ColorPickerMain">
                <Header hN={2} sx={{ marginBottom: "0.5em" }}>
                  Цвет гранаты
                </Header>
                <div
                  className="ColorDisplay"
                  style={{
                    backgroundColor: dispatcher.circleClickedCurrentColor,
                  }}
                >
                  <p>Для {kolobokName}</p>
                </div>
                <label>Выберите другой:</label>
                <input
                  type="color"
                  value={color || dispatcher.circleClickedCurrentColor}
                  onChange={handleColorChange}
                />
              </div>
              <button
                className="ColorPickerCloseButton"
                onClick={dispatcher.fnCloseColorPicker}
              >
                <IoMdClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ===
// styled
// ===
const StyledColorPicker = styled(ColorPicker)((props) => {
  // ---
  // CSSObject
  // ---
  return {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    overflow: "hidden",
    transition: "opacity 0.3s",
    zIndex: 10,

    "& .ColorPickerWrapper": {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    "& .ColorPickerContent": {
      position: "relative",
      margin: "1em",
      width: "100%",
      maxWidth: "300px",
      minHeight: "300px",
      borderRadius: "1em",
      backgroundColor: "white",
      padding: "1em",
      transform: "translateY(-50px)",
      transition: "opacity 0.3s, transform 0.3s",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    "& .ColorPickerCloseButton": {
      position: "absolute",
      top: "1em",
      right: "1em",
      width: "2em",
      height: "2em",
      padding: 0,
      backgroundColor: "transparent",
      cursor: "pointer",
      border: "1px solid gray",
    },

    "& .ColorPickerMain": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    "& .ColorDisplay": {
      width: "200px",
      height: "150px",
      border: "5px solid hsl(0,0%,80%)",
      borderRadius: "1em",
      marginBottom: "0.7em",
      transition: "0.25s ease",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    "& .ColorDisplay p": {
      margin: 0,
      padding: 0,
      color: "#eee",
    },

    "& .ColorPickerMain label": {
      fontSize: "1.2em",
      marginBottom: "0.5em",
    },
  };
});

// ===
// export
// ===
export default StyledColorPicker;
