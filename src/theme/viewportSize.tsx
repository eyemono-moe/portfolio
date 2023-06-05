import { createRoot, createSignal, onCleanup, onMount } from "solid-js";

const MOBILE_SIZE_QUERY = "screen and (max-width: 520px)";
const TABLET_SIZE_QUERY = "screen and (max-width: 960px)";

const viewportSize = () => {
  const [device, setDevice] = createSignal<"mobile" | "tablet" | "desktop">(
    "mobile"
  );

  let mobileMql: MediaQueryList;
  let tabletMql: MediaQueryList;

  const onChange = () => {
    if (mobileMql.matches) {
      setDevice("mobile");
    } else if (tabletMql.matches) {
      setDevice("tablet");
    } else {
      setDevice("desktop");
    }
  };

  onMount(() => {
    mobileMql = window.matchMedia(MOBILE_SIZE_QUERY);
    mobileMql.addEventListener("change", onChange);
    tabletMql = window.matchMedia(TABLET_SIZE_QUERY);
    tabletMql.addEventListener("change", onChange);
    onChange();
  });

  onCleanup(() => {
    mobileMql.removeEventListener("change", onChange);
    tabletMql.removeEventListener("change", onChange);
  });

  return device;
};

export const device = createRoot(viewportSize);
