import type { Component } from "solid-js";

const Footer: Component = () => {
  return (
    <footer class="flex w-full gap-2 bg-ui-backgroundInverted px-4 py-4 text-text-white md:px-10">
      <div>© 2023 eyemono.moe</div>
      <a
        href="https://github.com/eyemono-moe/portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="i-ri:github-fill h-6 w-6 text-text-white" />
      </a>
    </footer>
  );
};

export default Footer;
