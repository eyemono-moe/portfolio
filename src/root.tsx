// @refresh reload
import { styled } from "@macaron-css/solid";
import { Component, Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
  useIsRouting,
  useLocation,
} from "solid-start";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "~/consts";
import "normalize.css";
import { space } from "~/theme/space";
import StyleProvider from "~/theme/StyleProvider";
import { device } from "~/theme/viewportSize";

const BodyLayout = styled("div", {
  base: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: space.x3,
    overflowX: "hidden",
  },
});

const FadeOnRouting = styled("div", {
  base: {
    width: "100%",
    height: "100%",
    opacity: "1",
    transitionProperty: "opacity",
    transitionDuration: "0.2s",
  },
  variants: {
    isRouting: {
      true: {
        opacity: "0",
      },
    },
  },
});

const ContentBlock = styled("div", {
  base: {
    width: "100%",
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "0%",
  },
});

const CharaImg = styled("div", {
  base: {
    position: "fixed",
    top: "0",
    right: "0",
    width: "100%",
    height: "100vh",
    zIndex: "-1",
    pointerEvents: "none",
    backgroundImage: `url("/background/chara.webp")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right calc(25% - 200px) bottom -180px",
    backgroundSize: "auto calc(100% + 120px)",
    opacity: "1",

    transitionProperty: "all",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
  },
  variants: {
    isWorksPage: {
      true: {
        backgroundPosition: "right -999px bottom -180px",
        opacity: "0",
      },
    },
    isAboutPage: {
      true: {
        backgroundPosition: "left calc(80% + 400px) bottom -180px",
      },
    },
    isTopTablet: {
      true: {
        backgroundPosition: "right calc(25% - 220px) bottom -300px",
      },
    },
    isTopMobile: {
      true: {
        backgroundPosition: "right 60% bottom -150px",
        backgroundSize: "auto 100%",
      },
    },
    hiddenInAbout: {
      true: {
        opacity: "0",
      },
    },
  },
});

const BackgroundImg = styled("div", {
  base: {
    position: "fixed",
    top: "0",
    right: "0",
    width: "100%",
    height: "100vh",
    zIndex: "-3",
    pointerEvents: "none",
    backgroundImage: `url("/background/bg.webp")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right calc(25% - 200px) bottom -180px",
    backgroundSize: "auto calc(100% + 120px)",
    opacity: "1",

    transitionProperty: "all",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
  },
  variants: {
    isWorksPage: {
      true: {
        opacity: "0.7",
      },
    },
    isAboutPage: {
      true: {
        backgroundPosition: "left calc(80% + 400px) bottom -180px",
        opacity: "0.05",
      },
    },
    isTopTablet: {
      true: {
        backgroundPosition: "right calc(25% - 220px) bottom -300px",
      },
    },
    isTopMobile: {
      true: {
        backgroundPosition: "right 60% bottom -150px",
        backgroundSize: "auto 100%",
      },
    },
  },
});

const BackgroundImgs: Component = () => {
  const location = useLocation();

  return (
    <>
      <CharaImg
        isTopMobile={location.pathname === "/" && device() === "mobile"}
        isTopTablet={location.pathname === "/" && device() === "tablet"}
        isAboutPage={location.pathname === "/about"}
        hiddenInAbout={location.pathname === "/about" && device() !== "desktop"}
        isWorksPage={location.pathname === "/works"}
      />
      <BackgroundImg
        isTopTablet={location.pathname === "/" && device() === "tablet"}
        isTopMobile={location.pathname === "/" && device() === "mobile"}
        isAboutPage={location.pathname === "/about"}
        isWorksPage={location.pathname === "/works"}
      />
    </>
  );
};

const BodyContent: Component = () => {
  const isRouting = useIsRouting();

  return (
    <Body>
      <StyleProvider>
        <Suspense>
          <ErrorBoundary>
            <BodyLayout>
              <Header />
              <ContentBlock>
                <FadeOnRouting isRouting={isRouting()}>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </FadeOnRouting>
              </ContentBlock>
              <Footer />
            </BodyLayout>
            <BackgroundImgs />
          </ErrorBoundary>
        </Suspense>
      </StyleProvider>
      <Scripts />
    </Body>
  );
};

export default function Root() {
  return (
    <Html lang="ja">
      <Head>
        <Title>{SITE_TITLE}</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <Link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Link rel="icon" type="image/png" href="/favicon.png" />
        <Meta name="description" content={SITE_DESCRIPTION} />

        <Meta property="og:url" content={SITE_URL} />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content={SITE_TITLE} />
        <Meta property="og:description" content={SITE_DESCRIPTION} />
        <Meta property="og:image" content="https://www.eyemono.moe/OGP.webp" />

        <Meta name="twitter:card" content="summary_large_image" />
        <Meta property="twitter:url" content={SITE_URL} />
        <Meta name="twitter:title" content={SITE_TITLE} />
        <Meta name="twitter:description" content={SITE_DESCRIPTION} />
        <Meta name="twitter:image" content="https://www.eyemono.moe/OGP.webp" />
      </Head>
      <BodyContent />
    </Html>
  );
}
