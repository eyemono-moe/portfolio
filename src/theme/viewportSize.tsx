import { createRoot, createSignal, onCleanup, onMount } from "solid-js";

const MOBILE_SIZE_QUERY = "screen and (max-width: 520px)";
const TABLET_SIZE_QUERY = "screen and (max-width: 960px)";

const viewportSize = () => {
  const [device, setDevice] = createSignal<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  const onChange = () => {
    if (window.matchMedia(MOBILE_SIZE_QUERY).matches) {
      setDevice("mobile");
    } else if (window.matchMedia(TABLET_SIZE_QUERY).matches) {
      setDevice("tablet");
    } else {
      setDevice("desktop");
    }
  };

  onMount(() => {
    window.matchMedia(MOBILE_SIZE_QUERY).addEventListener("change", onChange);
    window.matchMedia(TABLET_SIZE_QUERY).addEventListener("change", onChange);
  });

  onCleanup(() => {
    window
      .matchMedia(MOBILE_SIZE_QUERY)
      .removeEventListener("change", onChange);
    window
      .matchMedia(TABLET_SIZE_QUERY)
      .removeEventListener("change", onChange);
  });

  return device;
};

export const device = createRoot(viewportSize);
