import {
  type ParentComponent,
  Show,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { Portal, isServer } from "solid-js/web";

const useModal = (mount?: Node) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const open = () => {
    // prevent scroll
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };
  const close = () => {
    // restore scroll
    document.body.style.overflow = "auto";
    setIsOpen(false);
  };

  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    }
  };

  onMount(() => {
    if (isServer) return;
    document.addEventListener("keydown", closeOnEsc);
  });
  onCleanup(() => {
    if (isServer) return;
    document.removeEventListener("keydown", closeOnEsc);
  });

  const Modal: ParentComponent = (props) => {
    return (
      <Show when={isOpen()}>
        <Portal mount={mount ? mount : document.body}>
          <div
            onClick={close}
            onKeyDown={closeOnEsc}
            class="fixed inset-0 grid place-items-center bg-black/50 p-2 backdrop-blur md:p-8"
          >
            {props.children}
          </div>
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
