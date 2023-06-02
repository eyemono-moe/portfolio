import { createRoot, createSignal, onCleanup, onMount } from "solid-js";

const VIEWPORT_SIZE_QUERY = "screen and (max-width: 640px)";

const viewportSize = () => {
  const [isMobile, setIsMobile] = createSignal(false);

  const onChange = () =>
    setIsMobile(window.matchMedia(VIEWPORT_SIZE_QUERY).matches);

  onMount(() => {
    window.matchMedia(VIEWPORT_SIZE_QUERY).addEventListener("change", onChange);
  });

  onCleanup(() => {
    window
      .matchMedia(VIEWPORT_SIZE_QUERY)
      .removeEventListener("change", onChange);
  });

  return isMobile;
};

export const isMobile = createRoot(viewportSize);
