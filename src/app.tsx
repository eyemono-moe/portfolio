import "virtual:uno.css";
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import "@unocss/reset/tailwind-compat.css";
import { Suspense } from "solid-js";
import Footer from "./components/Footer";
import Header from "./components/Header";

const BgImages = () => {
  const location = useLocation();

  return (
    <>
      <div
        class="fixed top-0 right-0 w-full h-100vh z--1 bg-[position:right_-999px_bottom_-180px] bg-[length:auto_calc(100%_+_120px)] object-contain bg-[url(/background/chara.webp)] bg-no-repeat data-[state=Z]:(bg-[position:right_60%_bottom_-150px] md:bg-[position:right_calc(25%_-_200px)_bottom_-180px]) data-[state^=Zabout]:(opacity-0 lg:(opacity-100 bg-[position:left_calc(80%_+_400px)_bottom_-180px])) transition-opacity,background-position-500"
        data-state={location.pathname.replace(/\//g, "Z")}
      />
      <div
        class="opacity-20 fixed top-0 right-0 w-full h-100vh z--3 bg-[position:left_calc(80%_+_400px)_bottom_-180px] bg-[length:auto_calc(100%_+_120px)] object-contain bg-[url(/background/bg.webp)] bg-no-repeat data-[state=Z]:(opacity-100 bg-[position:right_60%_bottom_-150px] md:bg-[position:right_calc(25%_-_200px)_bottom_-180px]) transition-opacity,background-position-500"
        data-state={location.pathname.replace(/\//g, "Z")}
      />
    </>
  );
};

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Suspense>
            <div class="flex min-h-100dvh flex-col overflow-hidden">
              <Header />
              <main class="mx-a mb-8 h-full w-full max-w-1024px shrink-1 grow px-4">
                {props.children}
              </main>
              <Footer />
            </div>
            <BgImages />
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
