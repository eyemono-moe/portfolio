// @refresh reload
import { StartClient, mount } from "@solidjs/start/client";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
mount(() => <StartClient />, document.getElementById("app")!);
