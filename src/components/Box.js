// ===
// import
// ===
import React from "react";
import styled from "@emotion/styled";

// ===
// main
// ===
const Box = React.forwardRef(function UnstyledBox(props, ref) {
  // ---
  // JSX
  // ---
  return (
    <div ref={ref} className={`Box ${props.className}`}>
      {props.children}
    </div>
  );
});

// ===
// styled
// ===
const StyledBox = styled(Box)((props) => {
  const sx = props.sx ? props.sx : null;

  // ---
  // CSSObject
  // ---
  return {
    opacity: sx && typeof sx.opacity === "number" ? sx.opacity : undefined,
    backgroundColor: sx && sx.bg ? sx.bg : "transparent",
    width: sx && sx.width ? sx.width : undefined,
    height: sx && sx.height ? sx.height : undefined,
    display: sx && sx.display ? sx.display : undefined,
    flexDirection: sx && sx.flexDirection ? sx.flexDirection : undefined,
    gridTemplateColumns:
      sx && sx.gridTemplateColumns ? sx.gridTemplateColumns : undefined,
    gridTemplateRows:
      sx && sx.gridTemplateRows ? sx.gridTemplateRows : undefined,
    justifyContent: sx && sx.justifyContent ? sx.justifyContent : undefined,
    alignItems: sx && sx.alignItems ? sx.alignItems : undefined,
    padding: sx && sx.padding ? sx.padding : undefined,
    paddingBottom: sx && sx.paddingBottom ? sx.paddingBottom : undefined,
    position: sx && sx.position ? sx.position : undefined,
    visibility: sx && sx.visibility ? sx.visibility : undefined,
    transition: sx && sx.transition ? sx.transition : undefined,
  };
});

// ===
// export
// ===
export default StyledBox;
