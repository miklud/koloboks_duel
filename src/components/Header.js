// ===
// import
// ===
import React from "react";
import styled from "@emotion/styled";

// ===
// main
// ===
const Header = function Header(props) {
  // ---
  // JSX
  // ---
  switch (props.hN) {
    case 1:
      return (
        <h1 className={`Header_h1 ${props.className}`}>{props.children}</h1>
      );
    case 2:
      return (
        <h2 className={`Header_h2 ${props.className}`}>{props.children}</h2>
      );
    case 3:
      return (
        <h3 className={`Header_h2 ${props.className}`}>{props.children}</h3>
      );
    case 4:
      return (
        <h4 className={`Header_h2 ${props.className}`}>{props.children}</h4>
      );
    case 5:
      return (
        <h5 className={`Header_h2 ${props.className}`}>{props.children}</h5>
      );

    default:
      throw new Error("Header => hN ???");
  }
};

// ===
// styled
// ===
const StyledHeader = styled(Header)((props) => {
  const sx = props.sx ? props.sx : null;

  // ---
  // CSSObject
  // ---
  return {
    margin: sx && sx.margin ? sx.margin : 0,
    marginTop: sx && sx.marginTop ? sx.marginTop : 0,
    marginBottom: sx && sx.marginBottom ? sx.marginBottom : 0,
    fontSize: sx && sx.fontSize ? sx.fontSize : undefined,
    textAlign: sx && sx.textAlign ? sx.textAlign : "center",
  };
});

// ===
// export
// ===
export default StyledHeader;
