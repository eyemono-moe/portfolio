import { styled } from "@macaron-css/solid";
import {
  ParentComponent,
  Show,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { Portal } from "solid-js/web";

import { layoutSpace } from "~/theme/space";
import StyleProvider from "~/theme/StyleProvider";

const ModalBackground = styled("div", {
  base: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(2px)",
    display: "grid",
    placeItems: "center",
    padding: layoutSpace.edgePadding,
  },
});

const useModal = (mount?: Node) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    }
  };

  onMount(() => {
    document.addEventListener("keydown", closeOnEsc);
  });
  onCleanup(() => {
    document.removeEventListener("keydown", closeOnEsc);
  });

  const Modal: ParentComponent = (props) => {
    return (
      <Show when={isOpen()}>
        <Portal mount={mount ? mount : document.body}>
          <StyleProvider>
            <ModalBackground
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              {props.children}
            </ModalBackground>
          </StyleProvider>
        </Portal>
      </Show>
    );
  };

  return {
    Modal,
    open,
    close,
    isOpen,
  };
};

export default useModal;
