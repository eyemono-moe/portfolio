import { styled } from "@macaron-css/solid";
import { ParentComponent } from "solid-js";

import { layoutSpace } from "~/theme/space";

const EdgePadding = styled("div", {
  base: {
    width: "100%",
    height: "100%",
    padding: `0 ${layoutSpace.edgePadding}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const RestrictWidth = styled("div", {
  base: {
    width: "100%",
    maxWidth: "1024px",
    height: "100%",
  },
});

const Main = styled("main", {
  base: {
    width: "100%",
    height: "100%",
  },
});

export const MainContainer: ParentComponent = (props) => {
  return (
    <EdgePadding>
      <RestrictWidth>
        <Main>{props.children}</Main>
      </RestrictWidth>
    </EdgePadding>
  );
};
