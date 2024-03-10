import { lazy } from "solid-js";

export const SITE_TITLE = "eyemono.moe Portfolio";
export const SITE_DESCRIPTION =
  "eyemono.moe の ポートフォリオ | Web / 3DCG Developer";
export const SITE_URL = "https://www.eyemono.moe/";

export const WORKS = [
  {
    title: "NeoShowcase",
    imagePath: "/work-thumbnail/neoshowcase.webp",
    tags: ["WebApp", "Solid.js", "TypeScript"],
    mdx: lazy(() => import("~/md/neoshowcase.md")),
  },
  {
    title: "eyeOS",
    imagePath: "/work-thumbnail/eyeos.webp",
    tags: ["WebApp", "Solid.js", "TypeScript"],
    mdx: lazy(() => import("~/md/eyeos.md")),
  },
  {
    title: "Portfolio",
    imagePath: "/work-thumbnail/portfolio.webp",
    tags: ["WebApp", "Solid.js", "TypeScript"],
    mdx: lazy(() => import("~/md/portfolio.md")),
  },
  {
    title: "毎日ポケモンしりとり",
    imagePath: "/work-thumbnail/poke-shiritori.webp",
    tags: ["WebApp", "Solid.js", "TypeScript"],
    mdx: lazy(() => import("~/md/poke-shiritori.md")),
  },
  {
    title: "VSCodeカラーテーマ 『Monoeye』",
    imagePath: "/work-thumbnail/vscode-theme-monoeye.webp",
    tags: ["TypeScript"],
    mdx: lazy(() => import("~/md/vscode-theme-monoeye.md")),
  },
  {
    title: "Virtual Detteiu",
    imagePath: "/work-thumbnail/virtual-detteiu.webp",
    tags: ["WebApp", "Solid.js", "TypeScript"],
    mdx: lazy(() => import("~/md/virtual-detteiu.md")),
  },
  {
    title: "でっていうメーカー",
    imagePath: "/work-thumbnail/icon-maker.webp",
    tags: ["WebApp", "Solid.js", "TypeScript"],
    mdx: lazy(() => import("~/md/icon-maker.md")),
  },
  {
    title: "Draw World",
    imagePath: "/work-thumbnail/draw-world.webp",
    tags: ["Game", "Unity", "Blender"],
    mdx: lazy(() => import("~/md/draw-world.md")),
  },
  {
    title: "プラズシ",
    imagePath: "/work-thumbnail/purazushi.webp",
    tags: ["Game", "Unity", "Blender"],
    mdx: lazy(() => import("~/md/purazushi.md")),
  },
  {
    title: "3DCG体験会",
    imagePath: "/work-thumbnail/3dcg-workshop.webp",
    tags: ["WebApp", "Blender"],
    mdx: lazy(() => import("~/md/3dcg-workshop.md")),
  },
  {
    title: "新勧パンフレットイラスト",
    imagePath: "/work-thumbnail/shinkan-bira.webp",
    tags: ["Illust", "Blender"],
    mdx: lazy(() => import("~/md/shinkan-bira.md")),
  },
  {
    title: "Janken Simulator",
    imagePath: "/work-thumbnail/janken-simulator.webp",
    tags: ["Game", "Blender"],
    mdx: lazy(() => import("~/md/janken-simulator.md")),
  },
  {
    title: "Make sure the Pressure",
    imagePath: "/work-thumbnail/make-sure-the-pressure.webp",
    tags: ["Game", "Blender"],
    mdx: lazy(() => import("~/md/make-sure-the-pressure.md")),
  },
];
