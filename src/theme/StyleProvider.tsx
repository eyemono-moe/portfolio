import { globalStyle } from "@macaron-css/core";
import { ParentComponent } from "solid-js";

import { layoutSpaceClass } from "~/theme/space";
import { fontSizeClass } from "~/theme/typography";

globalStyle("html, body", {
  margin: "0",
  padding: "0",
  fontFamily: `'Noto Sans JP', sans-serif`,
});

globalStyle("*, *:before, *:after", {
  boxSizing: "border-box",
});

const StyleProvider: ParentComponent = (props) => {
  return (
    <div
      classList={{
        [fontSizeClass()]: true,
        [layoutSpaceClass()]: true,
      }}
    >
      {props.children}
    </div>
  );
};

export default StyleProvider;
