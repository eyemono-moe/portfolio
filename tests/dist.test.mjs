import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const dist = (path) => new URL(`../dist/${path}`, import.meta.url);
const read = (path) => readFileSync(dist(path), "utf8");

test("index has Japanese lang and OGP", () => {
  const html = read("index.html");
  assert.match(html, /<html lang="ja"/);
  assert.ok(
    html.includes('property="og:image" content="https://eyemono.moe/OGP.webp"'),
  );
  assert.ok(html.includes("<title>eyemono.moe Portfolio</title>"));
  assert.ok(!html.includes("favicon.ico"));
});

test("old routes redirect to top", () => {
  for (const route of ["about", "works"]) {
    const html = read(`${route}/index.html`);
    assert.ok(html.includes('http-equiv="refresh"'), route);
    assert.match(html, /url=\/["']/, route);
  }
});

test("sitemap and static files exist", () => {
  for (const path of [
    "sitemap-index.xml",
    ".well-known/nostr.json",
    "robots.txt",
  ]) {
    assert.ok(existsSync(dist(path)), path);
  }
});

test("404 page exists", () => {
  assert.ok(read("404.html").includes("Page Not Found"));
});
