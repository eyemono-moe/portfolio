import { ParentComponent } from "solid-js";
import { isMobile } from "./viewportSize";
import { desktopFontSize, mobileFontSize } from "./typography";
import { spaceClass } from "./space";

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
