import { styled } from "@macaron-css/solid";
import { Component } from "solid-js";

import svgUrl from "~/assets/icon-blink.svg";
import { semanticColors } from "~/theme/color";

const CenteredContainer = styled("div", {
  base: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const IconContainer = styled("img", {
  base: {
    width: "max(40%, 100px)",
    height: "auto",
    aspectRatio: "1/1",
    borderRadius: "999px",
    border: `2px solid ${semanticColors.ui.border}`,
  },
});

const Icon: Component = () => {
  return (
    <CenteredContainer>
      <IconContainer src={svgUrl} />
    </CenteredContainer>
  );
};

export default Icon;
