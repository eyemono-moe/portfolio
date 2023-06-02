import { Title } from "solid-start";

import { SITE_TITLE } from "~/consts";

export default function Top() {
  return (
    <main>
      <Title>{SITE_TITLE}</Title>
      <h1>Hello world!</h1>
    </main>
  );
}
