import {
  For,
  type ParentComponent,
  Suspense,
  children,
  createEffect,
} from "solid-js";
import useModal from "~/libs/useModal";

export type WorkCardProps = {
  title: string;
  tags: string[];
  imagePath: string;
};

const WorkCard: ParentComponent<WorkCardProps> = (props) => {
  const { Modal, open, close } = useModal();

  const Tags = () => (
    <ul class="color-text-gray not-prose flex list-none items-center gap-2">
      <For each={props.tags}>
        {(tag) => <li class="before:content-['#']">{tag}</li>}
      </For>
    </ul>
  );

  return (
    <>
      <div
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter") open();
        }}
        class="group cursor-pointer overflow-hidden rounded bg-ui-background shadow"
      >
        <div class="h-150px w-full overflow-hidden">
          <img
            src={props.imagePath}
            alt={props.title}
            class="h-full w-full overflow-hidden object-cover transition-transform-100 group-hover:scale-110"
          />
        </div>
        <div class="p-2">
          {props.title}
          <Tags />
        </div>
      </div>
      <Modal>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation */}
        <div
          class="relative max-h-90dvh w-[min(100%,1024px)] overflow-y-auto rounded bg-ui-background"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div class="relative h-60% min-h-200px max-h-600px w-full">
            <img
              src={props.imagePath}
              alt={props.title}
              class="w-full h-60% min-h-200px max-h-600px object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>
          <div class="prose prose-black max-w-unset! px-4 py-4 md:px-8 transition-all-200 all-[a]:(text-text-link visited:text-text-visited) grid grid-rows-[auto_auto_0fr] has-[.content]:grid-rows-[auto_auto_1fr]">
            <h2 class="mt-0">{props.title}</h2>
            <Tags />
            <Suspense>
              <div class="content overflow-hidden">{props.children}</div>
            </Suspense>
          </div>
          <button
            onClick={close}
            class="absolute top-4 right-4 rounded-full bg-transparent bg-ui-background p-0"
            type="button"
          >
            <div class="i-ri:close-circle-line color-text-gray h-8 w-8" />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default WorkCard;
