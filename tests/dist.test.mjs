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

test("404 page replaces location with top", () => {
  const html = read("404.html");
  assert.match(html, /location\.replace\(["']\/["']\)/);
  assert.ok(html.includes('href="/"'));
});

const anchorsTo = (html, href) =>
  [...html.matchAll(/<a\b[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => tag.includes(`href="${href}`));

test("works lists 4 items in order", () => {
  const html = read("index.html");
  const titles = [...html.matchAll(/<h3[^>]*>([^<]*)<\/h3>/g)].map((m) =>
    m[1].trim(),
  );
  assert.deepEqual(titles, [
    "Streets",
    "NeoShowcase",
    "Game³ホームページ",
    "新勧パンフレットイラスト",
  ]);
});

test("works texts avoid bare circle names", () => {
  const html = read("index.html");
  assert.ok(html.includes("大学時代に所属していた創作サークル（traP）"));
  assert.ok(html.includes("大学の創作サークルが主催する"));
  assert.ok(!html.includes("サークル内で使用されている"));
});

test("work links open in new tab", () => {
  const tags = anchorsTo(read("index.html"), "https://streets.eyemono.moe");
  assert.ok(tags.length > 0);
  for (const tag of tags) {
    assert.ok(tag.includes('target="_blank"'), tag);
    assert.ok(tag.includes('rel="noopener noreferrer"'), tag);
  }
});

test("hero shows profile", () => {
  const html = read("index.html");
  for (const text of [
    "Web Engineer",
    "2025.4 -",
    "ポケットサイン株式会社",
    "2023.4 - 2025.3",
    "東京工業大学 修士課程（退学）",
    "TypeScript",
    "Solid.js",
    "React",
    "Vue",
    "Go",
    "Node.js",
    "Python",
  ]) {
    assert.ok(html.includes(text), text);
  }
  assert.match(html, /<rt[^>]*>アイモノ<\/rt>/);
  assert.match(html, /<rt[^>]*>モエ<\/rt>/);
  assert.ok(!html.includes("正社員"));
  assert.ok(!html.includes("業務委託"));
  assert.ok(!html.includes("フロントエンドエンジニア"));
});

test("hero has works button", () => {
  const tags = anchorsTo(read("index.html"), "#works");
  assert.ok(tags.some((tag) => tag.includes('class="to-works"')));
});

test("hero links", () => {
  const html = read("index.html");
  for (const href of [
    "https://card.eyemono.moe",
    "https://x.com/eyemono_moe",
  ]) {
    const tags = anchorsTo(html, href);
    assert.ok(tags.length > 0, href);
    for (const tag of tags) assert.ok(tag.includes('target="_blank"'), tag);
  }
});

test("body starts as hero and inline script switches to init", () => {
  const html = read("index.html");
  const body = html.match(/<body\b[^>]*>/)?.[0] ?? "";
  assert.ok(body.includes('data-state="hero"'), body);
  const afterBody = html.slice(html.indexOf(body) + body.length);
  const firstScript = afterBody.match(
    /^\s*<script\b[^>]*>([\s\S]*?)<\/script>/,
  );
  assert.ok(firstScript, "inline script right after <body>");
  assert.match(firstScript[1], /dataset\.state\s*=\s*["']init["']/);
});

test("stage layers exist", () => {
  const html = read("index.html");
  for (const cls of ["bgimg", "band", "chara", "band-front"]) {
    assert.match(html, new RegExp(`class="${cls}"`), cls);
  }
});

test("nav matches NAV", () => {
  const html = read("index.html");
  const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? "";
  const hrefs = [...header.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(hrefs, ["/#top", "/#works", "https://log.eyemono.moe"]);
  const blog = anchorsTo(header, "https://log.eyemono.moe")[0] ?? "";
  assert.ok(blog.includes('target="_blank"'), blog);
});

const readRepo = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("footer shows build year", () => {
  const html = read("index.html");
  assert.ok(html.includes(`© ${new Date().getFullYear()} eyemono.moe`));
  assert.ok(html.includes("https://github.com/eyemono-moe/portfolio"));
});

test("ci has no vercel deploy", () => {
  const ci = readRepo(".github/workflows/ci.yaml");
  assert.ok(!ci.includes("vercel"));
  assert.ok(!ci.includes("deploy"));
});

test("vercel git deploy enabled", () => {
  const path = new URL("../vercel.json", import.meta.url);
  if (!existsSync(path)) return;
  assert.ok(!readFileSync(path, "utf8").includes("deploymentEnabled"));
});

test("robots.txt points to the generated sitemap", () => {
  const robots = read("robots.txt");
  const url = robots.match(/^sitemap:\s*(\S+)/im)?.[1] ?? "";
  assert.ok(url.startsWith("https://eyemono.moe/"), url);
  assert.ok(existsSync(dist(url.replace("https://eyemono.moe/", ""))), url);
});

test("smooth scrolling is not applied to the initial hash jump", () => {
  const css = readRepo("src/styles/stage.css");
  assert.ok(!/(^|\})\s*html\s*\{[^}]*scroll-behavior:\s*smooth/.test(css));
  assert.match(css, /html\.smooth\s*\{[^}]*scroll-behavior:\s*smooth/);
});

test("hero fits small viewports", () => {
  const hero = readRepo("src/components/Hero.astro");
  assert.match(hero, /min-height:\s*100svh/);
});

test("hidden header becomes visible on keyboard focus", () => {
  const css = readRepo("src/styles/stage.css");
  assert.match(css, /body \.site-header:focus-within\s*\{[^}]*top:\s*0/);
});
