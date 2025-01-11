import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { SITE_TITLE } from "~/consts";

export default function Top() {
  return (
    <div>
      <Title>{`${SITE_TITLE}`}</Title>
      <h1 class="h1-text mb-4">eyemono.moe</h1>
      <nav>
        <ul class="flex flex-col gap-2">
          <li class="w-fit">
            <A class="parent relative" href="/about">
              <div class="h2-text px-4 py-2">About</div>
              <div class="absolute bottom--4px left-0 h-4px w-full origin-center scale-0 bg-text-black transition-transform-100 parent-hover:scale-100" />
            </A>
          </li>
          <li class="w-fit">
            <A class="parent relative" href="/works">
              <div class="h2-text px-4 py-2">Works</div>
              <div class="absolute bottom--4px left-0 h-4px w-full origin-center scale-0 bg-text-black transition-transform-100 parent-hover:scale-100" />
            </A>
          </li>
          <li class="w-fit">
            <a
              class="parent relative"
              href="https://log.eyemono.moe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="h2-text px-4 py-2">Blog</div>
              <div class="absolute bottom--4px left-0 h-4px w-full origin-center scale-0 bg-text-black transition-transform-100 parent-hover:scale-100" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
