import { A, useLocation } from "@solidjs/router";
import type { Component } from "solid-js";

const Header: Component = () => {
  const location = useLocation();

  return (
    <header
      class="parent w-full px-4 transition-top-200"
      data-state={location.pathname.replace(/\//g, "Z")}
    >
      <div class="transform-origin-[top_left] absolute left-0 z--2 h-150px w-full skew-x-0 skew-y--5deg bg-accent-secondary transition-width,height,transform-500 parent-data-[state=Z]:(md:(w-50% h-100vh skew-x--10deg skew-y-0) h-300px)" />
      <nav class="relative top-0 left-0 transition-top-200 parent-data-[state=Z]:top--200px">
        <ul class="flex items-center justify-between gap-12 md:justify-start text-black all-[.active]:after:scale-100">
          <li class="relative all-[a]:font-bold (label block flex w-a justify-center px-2 pt-2 pb-1 font-bold md:w-6ch)">
            <A
              class="after:(absolute bottom-0 left-0 block h-2px w-full origin-center scale-0 bg-text-black transition-transform-100 content-[''] hover:scale-50) label block flex w-a justify-center px-2 pt-2 pb-1 font-bold md:w-6ch"
              href="/"
              end
            >
              Top
            </A>
          </li>
          <li class="relative">
            <A
              class="after:(absolute bottom-0 left-0 block h-2px w-full origin-center scale-0 bg-text-black transition-transform-100 content-[''] hover:scale-50) label block flex w-a justify-center px-2 pt-2 pb-1 font-bold md:w-6ch"
              href="/about"
            >
              About
            </A>
          </li>
          <li class="relative">
            <A
              class="after:(absolute bottom-0 left-0 block h-2px w-full origin-center scale-0 bg-text-black transition-transform-100 content-[''] hover:scale-50) label block flex w-a justify-center px-2 pt-2 pb-1 font-bold md:w-6ch"
              href="/works"
            >
              Works
            </A>
          </li>
          <li class="relative">
            <a
              class="after:(absolute bottom-0 left-0 block h-2px w-full origin-center scale-0 bg-text-black transition-transform-100 content-[''] hover:scale-50) label block flex w-a justify-center px-2 pt-2 pb-1 font-bold md:w-6ch"
              href="https://log.eyemono.moe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
