import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { Component } from "solid-js";
import { A, useLocation } from "solid-start";

import { easeInOut } from "~/theme/animation";
import { semanticColors } from "~/theme/color";
import { layoutSpace, space } from "~/theme/space";
import { fontSize } from "~/theme/typography";
import { device } from "~/theme/viewportSize";

const HeaderContainer = styled("header", {
  base: {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
    padding: `0 ${layoutSpace.edgePadding}`,

    transitionProperty: "top",
    transitionDuration: "0.2s",
    transitionTimingFunction: easeInOut,
  },
});

const HeaderBackground = styled("div", {
  base: {
    position: "absolute",
    left: "0",
    width: "100%",
    height: "150px",
    transformOrigin: "top left",
    transform: "skewX(0deg) skewY(-5deg)",
    zIndex: "-2",
    backgroundColor: semanticColors.accent.secondary,

    transitionProperty: "width, height, transform",
    transitionDuration: "0.5s",
    transitionTimingFunction: easeInOut,
  },
  variants: {
    onTop: {
      true: {
        width: "50%",
        height: "100vh",
        transform: "skewX(-10deg) skewY(0deg)",
      },
    },
    isTopMobile: {
      true: {
        width: "100%",
        height: "300px",
        transform: "skewX(0deg) skewY(-5deg)",
      },
    },
  },
});

const HeaderNav = styled("nav", {
  base: {
    position: "relative",
    top: "0",
    left: "0",
    transitionProperty: "top",
    transitionDuration: "0.2s",
    transitionTimingFunction: easeInOut,
  },
  variants: {
    hidden: {
      true: {
        top: "-200px",
      },
    },
  },
});

const NavUl = styled("ul", {
  base: {
    margin: "0",
    marginInline: "0",
    marginBlock: "0",
    paddingInline: "0",
    listStyle: "none",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: space.x3,
  },
  variants: {
    isMobile: {
      true: {
        justifyContent: "space-between",
      },
    },
  },
});

const NavLi = styled("li", {
  base: {},
});

const NavAnchorClass = style({
  color: semanticColors.text.black,
  textDecoration: "none",
  position: "relative",
});

const NavText = styled("div", {
  base: {
    width: "6ch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${space["x0.5"]} ${space.x1}`,
    fontSize: fontSize.body.fontSize,
    lineHeight: fontSize.body.lineHeight,
    fontWeight: "bold",
  },
  variants: {
    isMobile: {
      true: {
        width: "auto",
      },
    },
  },
});

const NavBorder = styled("div", {
  base: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "2px",
    backgroundColor: semanticColors.text.black,
    transformOrigin: "center",
    transform: "scale(0)",
    zIndex: "-2",

    transitionProperty: "transform",
    transitionDuration: "0.1s",
    transitionTimingFunction: easeInOut,

    selectors: {
      "a:hover &": {
        transform: "scaleX(0.5)",
      },
      "a.active_ &": {
        transform: "scaleX(1)",
      },
    },
  },
});

const Header: Component = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <HeaderBackground
        onTop={location.pathname === "/"}
        isTopMobile={location.pathname === "/" && device() === "mobile"}
      />
      <HeaderNav hidden={location.pathname === "/"}>
        <NavUl isMobile={device() === "mobile"}>
          <NavLi>
            <A href="/" class={NavAnchorClass}>
              <NavText isMobile={device() === "mobile"}>Top</NavText>
              <NavBorder />
            </A>
          </NavLi>
          <NavLi>
            <A
              href="/about"
              class={NavAnchorClass}
              classList={{
                active_: location.pathname === "/about",
              }}
            >
              <NavText isMobile={device() === "mobile"}>About</NavText>
              <NavBorder />
            </A>
          </NavLi>
          <NavLi>
            <A
              href="/works"
              class={NavAnchorClass}
              classList={{
                active_: location.pathname === "/works",
              }}
            >
              <NavText isMobile={device() === "mobile"}>Works</NavText>
              <NavBorder />
            </A>
          </NavLi>
          <NavLi>
            <a
              href="https://trap.jp/author/d_etteiu8383/"
              target="_blank"
              rel="noopener noreferrer"
              class={NavAnchorClass}
            >
              <NavText isMobile={device() === "mobile"}>Blog</NavText>
              <NavBorder />
            </a>
          </NavLi>
        </NavUl>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
