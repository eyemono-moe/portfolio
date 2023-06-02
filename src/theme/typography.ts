import { createTheme, createThemeContract } from "@macaron-css/core";

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
});

export const desktopFontSize = createTheme(fontSize, {
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
});

export const mobileFontSize = createTheme(fontSize, {
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
});
