import { createTheme, createThemeContract } from "@macaron-css/core";

import { device } from "~/theme/viewportSize";

export const fontSize = createThemeContract({
  body: {
    fontSize: null,
    lineHeight: null,
  },
  h1: {
    fontSize: null,
    lineHeight: null,
  },
  h2: {
    fontSize: null,
    lineHeight: null,
  },
  h3: {
    fontSize: null,
    lineHeight: null,
  },
});

const desktopFontSize = createTheme(fontSize, {
  body: {
    fontSize: "1rem",
    lineHeight: "1.75",
  },
  h1: {
    fontSize: "2.625rem",
    lineHeight: "1.5",
  },
  h2: {
    fontSize: "2rem",
    lineHeight: "1.5",
  },
  h3: {
    fontSize: "1.625rem",
    lineHeight: "1.5",
  },
});

const mobileFontSize = createTheme(fontSize, {
  body: {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  h1: {
    fontSize: "1.625rem",
    lineHeight: "1.5",
  },
  h2: {
    fontSize: "1.5rem",
    lineHeight: "1.5",
  },
  h3: {
    fontSize: "1.375rem",
    lineHeight: "1.5",
  },
});

export const fontSizeClass = () =>
  device() === "mobile" ? mobileFontSize : desktopFontSize;
