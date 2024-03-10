import { Title } from "@solidjs/meta";
import { SITE_TITLE } from "~/consts";

export default function NotFound() {
  return (
    <>
      <Title>{`${SITE_TITLE} - Not Found`}</Title>
      <div class="prose prose-black">
        <h1>Page Not Found</h1>
      </div>
    </>
  );
}
