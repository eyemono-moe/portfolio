import { macaronVitePlugin } from "@macaron-css/vite";
import mdx from "@mdx-js/rollup";
import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
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
