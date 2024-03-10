import type { Component } from "solid-js";
import IconSvg from "~/assets/icon-blink.svg";

const Icon: Component = () => {
  return (
    <div class="flex w-full justify-center">
      <img
        src={IconSvg}
        class="aspect-square h-auto w-[max(40%,100px)] rounded-full"
        alt="eyemono logo"
      />
    </div>
  );
};

export default Icon;
