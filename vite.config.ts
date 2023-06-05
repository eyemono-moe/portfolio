import { macaronVitePlugin } from "@macaron-css/vite";
import mdx from "@mdx-js/rollup";
import devtools from "solid-devtools/vite";
import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    devtools(),
    mdx({
      jsxImportSource: "solid-jsx",
    }),
    macaronVitePlugin(),
    solid({
      adapter: vercel({}),
      extensions: ["mdx", "md"],
    }),
  ],
});
