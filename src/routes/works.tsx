import { styled } from "@macaron-css/solid";
import { For, Suspense } from "solid-js";
import { Title } from "solid-start";

import { MainContainer } from "~/components/MainContainer";
import { H1 } from "~/components/Primitives";
import WorkCard from "~/components/WorkCard";
import { SITE_TITLE, WORKS } from "~/consts";
import { markdownComponents } from "~/theme/Markdown";
import { space } from "~/theme/space";

const WorkCards = styled("div", {
  base: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gridTemplateRows: "auto",
    gap: space.x2,
  },
});

export default function Works() {
  return (
    <>
      <Title>{`${SITE_TITLE} - Works`}</Title>
      <MainContainer>
        <H1>Works</H1>
        <WorkCards>
          <For each={WORKS}>
            {(work) => (
              <WorkCard
                title={work.title}
                tags={work.tags}
                imagePath={work.imagePath}
              >
                <Suspense>
                  <work.mdx components={markdownComponents} />
                </Suspense>
              </WorkCard>
            )}
          </For>
        </WorkCards>
      </MainContainer>
    </>
  );
}
