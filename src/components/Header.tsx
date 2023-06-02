import { Component } from "solid-js";
import { A } from "solid-start";

const Header: Component = () => {
  return (
    <div>
      <A href="/">Top</A>
      <A href="/about">About</A>
      <A href="/works">Works</A>
      <a
        href="https://trap.jp/author/d_etteiu8383/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blog
      </a>
    </div>
  );
};

export default Header;
