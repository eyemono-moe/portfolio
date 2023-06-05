import { styled } from "@macaron-css/solid";
import { Title } from "solid-start";

import { MainContainer } from "~/components/MainContainer";
import { H1 } from "~/components/Primitives";
import { SITE_TITLE } from "~/consts";
import AboutMDX from "~/md/about.mdx";
import { markdownComponents } from "~/theme/Markdown";

const MarkdownContainer = styled("div", {
  base: {
    width: "100%",
    maxWidth: "min(500px, 100%)",
  },
});

export default function About() {
  return (
    <>
      <Title>{`${SITE_TITLE} - About`}</Title>
      <MainContainer>
        <H1>About</H1>
        <MarkdownContainer>
          <AboutMDX components={markdownComponents} />
        </MarkdownContainer>
      </MainContainer>
    </>
  );
}
