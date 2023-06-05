import { ParentComponent, ParentProps, JSX } from "solid-js";
import { MDXProvider } from "solid-jsx";

import { H1, H2, H3, Text } from "~/components/Primitives";

export const markdownComponents: {
  [k: string]: (properties_: ParentProps) => JSX.Element;
} = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Text,
};

const Markdown: ParentComponent = (props) => {
  return (
    <MDXProvider components={markdownComponents}>{props.children}</MDXProvider>
  );
};

export default Markdown;
