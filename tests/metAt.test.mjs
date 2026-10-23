import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatDate,
  parseMetAt,
  stripMetAtParams,
  toDisplayDate,
} from "../src/lib/metAt.js";

// 2026-10-11T23:30Z は日本時間で 10/12 の 8:30
const now = new Date("2026-10-11T23:30:00Z");

test("formatDate uses Japan time", () => {
  assert.equal(formatDate(now), "2026-10-12");
});

test("parseMetAt reads at and falls back to today", () => {
  assert.deepEqual(parseMetAt("?at=Game%C2%B3", now), {
    name: "Game³",
    date: "2026-10-12",
  });
});

test("parseMetAt keeps a valid date handed over from the card", () => {
  assert.deepEqual(parseMetAt("?at=Game%C2%B3&date=2025-03-01", now), {
    name: "Game³",
    date: "2025-03-01",
  });
  assert.equal(parseMetAt("?at=x&date=2025-3-1", now)?.date, "2026-10-12");
});

test("parseMetAt ignores missing or blank names", () => {
  assert.equal(parseMetAt("", now), null);
  assert.equal(parseMetAt("?at=%20%20", now), null);
});

test("parseMetAt trims and caps long names", () => {
  const long = "あ".repeat(60);
  assert.equal(
    parseMetAt(`?at=${encodeURIComponent(` ${long} `)}`, now)?.name,
    "あ".repeat(40),
  );
});

test("toDisplayDate uses dots", () => {
  assert.equal(toDisplayDate("2026-10-12"), "2026.10.12");
});

test("stripMetAtParams keeps other params and hash", () => {
  assert.equal(
    stripMetAtParams("https://eyemono.moe/?at=x&date=2026-10-12&ref=1#works"),
    "/?ref=1#works",
  );
  assert.equal(stripMetAtParams("https://eyemono.moe/?at=x"), "/");
});
