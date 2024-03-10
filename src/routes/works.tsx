import { Title } from "@solidjs/meta";
import { For, Suspense } from "solid-js";
import WorkCard from "~/components/WorkCard";
import { SITE_TITLE, WORKS } from "~/consts";

export default function Works() {
  return (
    <>
      <Title>{`${SITE_TITLE} - Works`}</Title>
      <div class="prose max-w-unset! prose-black">
        <h1>Works</h1>
        <div class="w-full grid gap-2 grid-cols-minmax-250px">
          <For each={WORKS}>
            {(work) => (
              <WorkCard
                title={work.title}
                tags={work.tags}
                imagePath={work.imagePath}
              >
                <work.mdx />
              </WorkCard>
            )}
          </For>
        </div>
      </div>
    </>
  );
}
