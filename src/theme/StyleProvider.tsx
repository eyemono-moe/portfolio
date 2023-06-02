import { ParentComponent } from "solid-js";

import { spaceClass } from "./space";
import { desktopFontSize, mobileFontSize } from "./typography";
import { isMobile } from "./viewportSize";

const StyleProvider: ParentComponent = (props) => {
  return (
    <div
      classList={{
        [mobileFontSize]: isMobile(),
        [desktopFontSize]: !isMobile(),
        [spaceClass]: true,
      }}
    >
      {props.children}
    </div>
  );
};

export default StyleProvider;
