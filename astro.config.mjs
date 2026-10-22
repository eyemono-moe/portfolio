import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import UnoCSS from "unocss/astro";

export default defineConfig({
  site: "https://eyemono.moe",
  output: "static",
  integrations: [
    UnoCSS({ injectReset: "@unocss/reset/tailwind-compat.css" }),
    sitemap(),
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ],
    }),
  },
  redirects: {
    "/about": "/",
    "/works": "/",
  },
});
