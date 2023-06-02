import { Title } from "solid-start";
import { SITE_TITLE } from "~/consts";

export default function About() {
  return (
    <main>
      <Title>{`${SITE_TITLE} - About`}</Title>
      <h1>About</h1>
    </main>
  );
}
