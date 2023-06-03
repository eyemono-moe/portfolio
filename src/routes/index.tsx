import { A } from "@solidjs/router";
import { Title } from "solid-start";

import { SITE_TITLE } from "~/consts";

export default function Top() {
  return (
    <main>
      <Title>{SITE_TITLE}</Title>
      <ul>
        <li>
          <A href="/about">About</A>
        </li>
        <li>
          <A href="/works">Works</A>
        </li>
        <li>
          <a
            href="https://trap.jp/author/d_etteiu8383/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </li>
      </ul>
    </main>
  );
}
