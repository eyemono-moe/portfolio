import transformerVariantGroup from "@unocss/transformer-variant-group";
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from "unocss";

const black = "#191E1E";
const white = "#ffffff";
const purple = "#CC33FF";
const green = "#C8FF33";
const pink = "#FF33B7";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Noto Sans JP:400,700",
      },
    }),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup()],
  theme: {
    fontSize: {
      button: [
        "1.25rem",
        {
          "line-height": "1.5",
          "font-weight": "700",
        },
      ],
      "h-l": [
        "2.5rem",
        {
          "font-weight": "700",
          "line-height": "1.4",
        },
      ],
      "h-l-m": [
        "2.25rem",
        {
          "font-weight": "700",
          "line-height": "1.5",
        },
      ],
      "h-m": [
        "2rem",
        {
          "font-weight": "700",
          "line-height": "1.5",
        },
      ],
      "h-m-m": [
        "1.75rem",
        {
          "font-weight": "700",
          "line-height": "1.5",
        },
      ],
      "h-s": [
        "1.75rem",
        {
          "font-weight": "700",
          "line-height": "1.5",
        },
      ],
      "h-s-m": [
        "1.5rem",
        {
          "font-weight": "700",
          "line-height": "1.5",
        },
      ],
      "body-l": [
        "1rem",
        {
          "line-height": "1.7",
        },
      ],
      "body-m": [
        "0.875rem",
        {
          "line-height": "1.7",
        },
      ],
      "label-l": [
        "1.125rem",
        {
          "font-weight": "500",
          "line-height": "1.5",
        },
      ],
      "label-m": [
        "1rem",
        {
          "font-weight": "500",
          "line-height": "1.5",
        },
      ],
      "caption-l": [
        "0.875rem",
        {
          "line-height": "1.7",
        },
      ],
      "caption-m": [
        "0.75rem",
        {
          "line-height": "1.7",
        },
      ],
    },
    colors: {
      accent: {
        primary: purple,
        secondary: green,
        tertiary: pink,
      },
      text: {
        black: black,
        gray: "#788787",
        link: "#0017C1",
        visited: "#000082",
        white: white,
      },
      ui: {
        border: "#526060",
        background: white,
        backgroundInverted: black,
      },
      black,
    },
  },
  shortcuts: {
    "h1-text": "text-h-l-m md:text-h-l",
    "h2-text": "text-h-m-m md:text-h-m",
    "h3-text": "text-h-s-m md:text-h-s",
    body: "text-body-m md:text-body-l",
    label: "text-label-m md:text-label-l",
    caption: "text-caption-l md:text-caption-m",
  },
});
