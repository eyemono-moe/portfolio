import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { For, ParentComponent, Show } from "solid-js";

import { H2 } from "~/components/Primitives";
import useModal from "~/libs/useModal";
import { semanticColors } from "~/theme/color";
import { space } from "~/theme/space";
import { fontSize } from "~/theme/typography";
import { device } from "~/theme/viewportSize";

const CardContainerClass = style({
  borderRadius: "8px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: semanticColors.ui.border,
  cursor: "pointer",
  overflow: "hidden",
  backgroundColor: semanticColors.ui.background,
});

const ThumbnailContainer = styled("div", {
  base: {
    overflow: "hidden",
    width: "100%",
    height: "150px",
  },
});

const Thumbnail = styled("img", {
  base: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transitionProperty: "transform, opacity",
    transitionDuration: "0.1s",
    transitionTimingFunction: "ease",

    selectors: {
      [`${CardContainerClass}:hover &`]: {
        transform: "scale(1.1)",
        opacity: "0.8",
      },
    },
  },
});

const TagsWrapper = styled("ul", {
  base: {
    margin: "0",
    marginInline: "0",
    marginBlock: "0",
    paddingInline: "0",
    listStyle: "none",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: space.x1,
  },
});

const Tag = styled("span", {
  base: {
    color: semanticColors.text.gray,
    ":before": {
      content: "'#'",
    },
  },
});

const CardContents = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: space["x0.5"],
    padding: space.x2,
  },
});

const ModalContainer = styled("div", {
  base: {
    borderRadius: "8px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: semanticColors.ui.border,
    background: semanticColors.ui.background,
    width: "min(100%, 1024px)",
    overflow: "hidden",
  },
});

const Vignette = styled("div", {
  base: {
    position: "relative",
    selectors: {
      "&::before": {
        content: "''",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "linear-gradient(transparent 75%, rgba(0,0,0,0.25))",
        zIndex: "1",
      },
    },
  },
});

const PreviewImg = styled("img", {
  base: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
  },
  variants: {
    isMobile: {
      true: {
        height: "200px",
      },
    },
  },
});

const DescriptionContainer = styled("div", {
  base: {
    padding: space.x2,
  },
});

const CardTitle = styled(H2, {
  base: {
    margin: "0",
    fontSize: fontSize.h2.fontSize,
    lineHeight: fontSize.h2.lineHeight,
  },
});

export type WorkCardProps = {
  title: string;
  tags: string[];
  imagePath?: string;
};

const WorkCard: ParentComponent<WorkCardProps> = (props) => {
  const { Modal, open } = useModal();

  const Tags = () => (
    <TagsWrapper>
      <For each={props.tags}>
        {(tag) => (
          <li>
            <Tag>{tag}</Tag>
          </li>
        )}
      </For>
    </TagsWrapper>
  );

  return (
    <>
      <div class={CardContainerClass} onClick={open}>
        <Show when={props.imagePath}>
          <ThumbnailContainer>
            <Thumbnail src={props.imagePath} alt={props.title} />
          </ThumbnailContainer>
        </Show>
        <CardContents>
          {props.title}
          <Tags />
        </CardContents>
      </div>
      <Modal>
        <ModalContainer>
          <Show when={props.imagePath}>
            <Vignette>
              <PreviewImg
                src={props.imagePath}
                alt={props.title}
                isMobile={device() === "mobile"}
              />
            </Vignette>
          </Show>
          <DescriptionContainer>
            <CardTitle>{props.title}</CardTitle>
            <Tags />
            {props.children}
          </DescriptionContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default WorkCard;