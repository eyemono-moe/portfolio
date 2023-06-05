import { styled } from "@macaron-css/solid";

import { semanticColors } from "~/theme/color";
import { fontSize } from "~/theme/typography";

export const H1 = styled("h1", {
  base: {
    color: semanticColors.text.black,
    fontSize: fontSize.h1.fontSize,
    lineHeight: fontSize.h1.lineHeight,
    marginTop: 0,
  },
});
export const H2 = styled("h2", {
  base: {
    color: semanticColors.text.black,
    fontSize: fontSize.h2.fontSize,
    lineHeight: fontSize.h2.lineHeight,
    marginTop: 0,
  },
});
export const H3 = styled("h3", {
  base: {
    color: semanticColors.text.black,
    fontSize: fontSize.h3.fontSize,
    lineHeight: fontSize.h3.lineHeight,
    marginTop: 0,
  },
});
export const Text = styled("p", {
  base: {
    color: semanticColors.text.black,
    fontSize: fontSize.body.fontSize,
    lineHeight: fontSize.body.lineHeight,
  },
});
