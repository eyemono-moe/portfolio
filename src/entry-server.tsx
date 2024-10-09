// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./consts";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta name="description" content={SITE_DESCRIPTION} />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Noto Sans JP:wght@400;700&display=swap"
          />
          <link rel="preload" as="image" href="/background/chara.webp" />
          <link rel="preload" as="image" href="/background/bg.webp" />

          <meta property="og:url" content={SITE_URL} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={SITE_TITLE} />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          <meta property="og:image" content="https://eyemono.moe/OGP.webp" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={SITE_URL} />
          <meta name="twitter:title" content={SITE_TITLE} />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
          <meta name="twitter:image" content="https://eyemono.moe/OGP.webp" />
          {assets}
        </head>
        <body>
          <div id="app" class="font-sans">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
