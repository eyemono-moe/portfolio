import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { A } from "@solidjs/router";
import { Title } from "solid-start";

import { MainContainer } from "~/components/MainContainer";
import { H1 } from "~/components/Primitives";
import { SITE_TITLE } from "~/consts";
import { semanticColors } from "~/theme/color";
import { space } from "~/theme/space";
import { fontSize } from "~/theme/typography";

const TopNav = styled("nav", {});

const TopNavUl = styled("ul", {
  base: {
    margin: "0",
    marginInline: "0",
    marginBlock: "0",
    paddingInline: "0",
    listStyle: "none",

    display: "flex",
    flexDirection: "column",
    gap: space.x1,
  },
});

const TopNavLi = styled("li", {
  base: {
    width: "fit-content",
  },
});

const NavAnchorClass = style({
  color: semanticColors.text.black,
  textDecoration: "none",
  position: "relative",
});

const NavText = styled("div", {
  base: {
    padding: `${space.x1} ${space.x2}`,
    fontSize: fontSize.h2.fontSize,
    lineHeight: fontSize.h2.lineHeight,
    fontWeight: "bold",
  },
});

const NavBorder = styled("div", {
  base: {
    position: "absolute",
    bottom: "-4px",
    left: "0",
    width: "100%",
    height: "4px",
    backgroundColor: semanticColors.text.black,
    transformOrigin: "center",
    transform: "scale(0)",
    zIndex: "-2",

    transitionProperty: "all",
    transitionDuration: "0.1s",
    transitionTimingFunction: "ease",

    selectors: {
      "a:hover &": {
        transform: "scale(1)",
      },
    },
  },
});

const VerticalCenter = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
});

export default function Top() {
  return (
    <>
      <Title>{SITE_TITLE}</Title>
      <MainContainer>
        <VerticalCenter>
          <H1>d_etteiu Portfolio</H1>
          <TopNav>
            <TopNavUl>
              <TopNavLi>
                <A class={NavAnchorClass} href="/about">
                  <NavText>About</NavText>
                  <NavBorder />
                </A>
              </TopNavLi>
              <TopNavLi>
                <A class={NavAnchorClass} href="/works">
                  <NavText>Works</NavText>
                  <NavBorder />
                </A>
              </TopNavLi>
              <TopNavLi>
                <a
                  class={NavAnchorClass}
                  href="https://trap.jp/author/d_etteiu8383/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <NavText>Blog</NavText>
                  <NavBorder />
                </a>
              </TopNavLi>
            </TopNavUl>
          </TopNav>
        </VerticalCenter>
      </MainContainer>
    </>
  );
}
