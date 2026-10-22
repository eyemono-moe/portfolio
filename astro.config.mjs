import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

export default defineConfig({
  site: "https://eyemono.moe",
  output: "static",
  integrations: [
    UnoCSS({ injectReset: "@unocss/reset/tailwind-compat.css" }),
    sitemap(),
  ],
  redirects: {
    "/about": "/",
    "/works": "/",
  },
});
