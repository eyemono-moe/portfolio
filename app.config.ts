import mdx from "@mdx-js/rollup";
import { defineConfig } from "@solidjs/start/config";
import UnoCSS from "unocss/vite";

export default defineConfig({
  vite: {
    plugins: [
      mdx({
        jsxImportSource: "solid-jsx",
      }),
      UnoCSS({}),
    ],
  },
});
