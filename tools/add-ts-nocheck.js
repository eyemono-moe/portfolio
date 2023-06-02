// workaround for solid-start typescript errors
// see: https://github.com/solidjs/solid-start/issues/255#issuecomment-1307003993
import fs from "fs";

const ADDED_STR = "// @ts-nocheck\n\n";
const FILES = [
  "node_modules/solid-start/data/createRouteAction.tsx",
  "node_modules/solid-start/data/createRouteData.tsx",
  "node_modules/solid-start/data/Form.tsx",
  "node_modules/solid-start/entry-client/mount.tsx",
  "node_modules/solid-start/entry-client/StartClient.tsx",
  "node_modules/solid-start/entry-server/render.ts",
  "node_modules/solid-start/entry-server/StartServer.tsx",
  "node_modules/solid-start/error-boundary/ErrorBoundary.tsx",
  "node_modules/solid-start/islands/index.tsx",
  "node_modules/solid-start/islands/router.ts",
  "node_modules/solid-start/root/InlineStyles.tsx",
  "node_modules/solid-start/root/Links.tsx",
  "node_modules/solid-start/root/Scripts.tsx",
  "node_modules/solid-start/router.tsx",
  "node_modules/solid-start/server/components/HttpHeader.tsx",
  "node_modules/solid-start/server/components/HttpStatusCode.tsx",
  "node_modules/solid-start/server/middleware.ts",
  "node_modules/solid-start/server/responses.ts",
  "node_modules/solid-start/server/server-functions/server.ts",
  "node_modules/solid-start/types.ts",
  "node_modules/solid-start/vite/plugin.d.ts",
];

Promise.allSettled(FILES.map(addTsNoCheck))
  .then((results) => {
    let hasErrors = false;

    for (const result of results) {
      if (result.status === "rejected") {
        hasErrors = true;
        console.error(result.reason);
      }
    }

    if (hasErrors) {
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * @param {string} file
 */
function addTsNoCheck(file) {
  const content = fs.readFileSync(file).toString();

  if (content.includes(ADDED_STR)) {
    console.log(JSON.stringify(ADDED_STR), "is already in", file);
  } else {
    fs.writeFileSync(file, ADDED_STR + content);
    console.log(JSON.stringify(ADDED_STR), "added into", file);
  }
}
