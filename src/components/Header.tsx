import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { TbExternalLink } from "solid-icons/tb";
import { Component } from "solid-js";
import { A, useLocation } from "solid-start";

import { space } from "~/theme/space";

const HeaderContainer = styled("header", {
  base: {
    position: "relative",
    top: "0",
    left: "0",
    width: "100%",
    transitionProperty: "top",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
  },
  variants: {
    hidden: {
      true: {
        top: "-100px",
      },
    },
  },
});

const HeaderNav = styled("nav", {
  base: { padding: `${space.x2} ${space.x3}` },
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
    gap: space.x2,
  },
});

const NavLi = styled("li", {
  base: {
    listStyle: "none",
  },
});

const NavAnchorClass = style({
  color: "#000",
  textDecoration: "none",
});

const NavText = styled("div", {
  base: {
    display: "flex",
    flexDirection: "row",
    gap: space["x0.5"],
    alignItems: "center",
    padding: `${space.x1} ${space.x2}`,
  },
  variants: {
    current: {
      true: {
        borderBottom: "2px solid #000",
      },
    },
  },
});

const Header: Component = () => {
  const location = useLocation();

  return (
    <HeaderContainer hidden={location.pathname === "/"}>
      <HeaderNav>
        <NavUl>
          <NavLi>
            <A href="/" class={NavAnchorClass}>
              <NavText>Top</NavText>
            </A>
          </NavLi>
          <NavLi>
            <A href="/about" class={NavAnchorClass}>
              <NavText current={location.pathname === "/about"}>About</NavText>
            </A>
          </NavLi>
          <NavLi>
            <A href="/works" class={NavAnchorClass}>
              <NavText current={location.pathname === "/works"}>Works</NavText>
            </A>
          </NavLi>
          <NavLi>
            <a
              href="https://trap.jp/author/d_etteiu8383/"
              target="_blank"
              rel="noopener noreferrer"
              class={NavAnchorClass}
            >
              <NavText>
                Blog
                <TbExternalLink size={18} color="#000000" />
              </NavText>
            </a>
          </NavLi>
        </NavUl>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
