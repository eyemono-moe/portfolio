import { Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

import { MainContainer } from "~/components/MainContainer";
import { H1 } from "~/components/Primitives";
import { SITE_TITLE } from "~/consts";

export default function NotFound() {
  return (
    <>
      <Title>{`${SITE_TITLE} - Not Found`}</Title>
      <HttpStatusCode code={404} />
      <MainContainer>
        <H1>Page Not Found</H1>
      </MainContainer>
    </>
  );
}
