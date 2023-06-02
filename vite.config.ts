import { macaronVitePlugin } from "@macaron-css/vite";
import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    macaronVitePlugin(),
    solid({
      adapter: vercel({}),
    }),
  ],
});
