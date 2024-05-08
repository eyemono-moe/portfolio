import { Title } from "@solidjs/meta";
import { SITE_TITLE } from "~/consts";
import AboutMDX from "~/md/about.mdx";

export default function About() {
  return (
    <>
      <Title>{`${SITE_TITLE} - About`}</Title>
      <div class="prose prose-black all-[a]:(text-text-link visited:text-text-visited) all-[li>ul]:my-1">
        <h1>About</h1>
        <AboutMDX />
      </div>
    </>
  );
}
