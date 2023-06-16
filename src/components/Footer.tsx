import { styled } from "@macaron-css/solid";
import { FaBrandsGithub } from "solid-icons/fa";
import { Component } from "solid-js";

import { semanticColors } from "~/theme/color";
import { layoutSpace, space } from "~/theme/space";

const FooterContainer = styled("footer", {
  base: {
    position: "relative",
    width: "100%",
    padding: `${space.x2} ${layoutSpace.edgePadding}`,
    color: semanticColors.text.white,
    backgroundColor: semanticColors.ui.backgroundInverted,

    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: space.x2,
  },
});

const Footer: Component = () => {
  return (
    <FooterContainer>
      <div>© 2023 eyemono.moe</div>
      <a
        href="https://github.com/detteiu8383/portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaBrandsGithub size={36} fill={semanticColors.text.white} />
      </a>
    </FooterContainer>
  );
};

export default Footer;
