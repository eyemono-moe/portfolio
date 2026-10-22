# eyemono.moe リニューアル 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** SolidStart 製のポートフォリオを、Astro と素の JS で作る1ページ構成のサイトに置き換える。作る内容はプロフィール（ヒーロー）と Works 4件。

**Architecture:**
- Astro の静的出力で `/` を1ページだけ生成する。
- 帯、キャラ、背景画像の演出は、`body[data-state]`（`init` / `hero` / `content`）を切り替えて CSS transition で動かす。
  - 帯の形は `clip-path` の4頂点で描く。
  - state の切り替えは、小さな `<script>` がスクロール位置を見て行う。
- 作品は Content Collections に置き、プロフィールは `src/consts.ts` に置く。

**Tech Stack:**
- Astro 7.4（Node >= 22.23.4、ここでは Node 24 LTS を使う）
- @astrojs/sitemap 3.7
- UnoCSS 66（@unocss/astro、preset-wind3）
- Biome 2.6、pnpm 12、node:test（ビルド結果の HTML を検査する）

**Spec:** `docs/superpowers/specs/2026-10-23-portfolio-renewal-design.md`

**正となるプロトタイプ:** `docs/superpowers/specs/2026-10-23-portfolio-renewal-prototype.html`
- レイアウト、文言、CSS、JS はこのプロトタイプを正とする。
- 以下の各タスクで「プロトタイプから移植」と書いた箇所は、ここの `<style>` と `<script>` をそのまま持ち込む。
- 持ち込むときは、`/files/` で始まるパスを本番のパスに読み替える。
  - `/files/chara.webp` → `/background/chara.webp`
  - `/files/bg.webp` → `/background/bg.webp`
  - アイコンは `src/assets/icon-blink.svg` を import する。
  - サムネイルは `/work-thumbnail/*.webp`。

## Global Constraints

- Node 24 LTS を使う（`mise use node@24`）。`package.json` の `engines.node` は `">=24"`、`packageManager` は `pnpm@12.15.0`。
- UI フレームワーク（Solid、React など）は使わない。クライアント側の JS は `<script>` だけにする。
- `<html lang="ja">` にする。
- 色は uno.config の値をそのまま使う：black `#191E1E`、green `#C8FF33`、purple `#CC33FF`、pink `#FF33B7`、gray `#788787`、link `#0017C1`、visited `#000082`。フォントは Noto Sans JP（400 / 700）。
- 文言は spec の「固定の文言」と「Works」の表のとおりにする。肩書きは `Web Engineer`。
- 外部リンクには `target="_blank" rel="noopener noreferrer"` を付ける。対象は Blog、GitHub、X、Card と、作品内のリンク。ページ内のアンカーには付けない。
- `public/.well-known/nostr.json`、`public/robots.txt`、`public/OGP.webp`、`public/favicon.svg`、`public/favicon.png`、`public/background/*` は変更しない。

## Review Focus

1. **JS が動かない環境**：body が `init` のままになると、ヒーローの中身は opacity 0 のままで何も見えない。
   - 期待する挙動：JS がなくても `hero` の見た目で全部読めること。
   - 対策：HTML には `data-state="hero"` を書いておき、`<body>` の直後のインラインスクリプトで同期的に `init` へ変える。
   - テスト：Task 4 の `body starts as hero and inline script switches to init`。
2. **途中までスクロールした状態での読み込み**：`/#works` を直接開いた場合や、Works の位置でリロードした場合。
   - 期待する挙動：最初から `content`（ヘッダー表示、キャラなし）になること。`hero` に戻ってはいけない。
   - 確認：Task 4 の手動確認の項目。
3. **幅 320px の端末**：ナビ（16 + 3×80 + 2×48 = 352px）がはみ出す。
   - 期待する挙動：ナビが横スクロールせずに収まり、帯の下端も Blog の右下に合っていること。
   - 対策：400px 以下では `--nav-gap: 16px` にする。
   - 確認：Task 4 の手動確認の項目。
4. **`prefers-reduced-motion: reduce`**
   - 期待する挙動：帯もキャラも動かずに最終状態だけを表示すること。「Works を見る」の矢印も止まること。
   - 確認：Task 4 の手動確認の項目。
5. **旧 URL**：外部から `/about` や `/works` に来た場合。
   - 期待する挙動：404 ではなく `/` に移ること。
   - テスト：Task 1 の `old routes redirect to top`。

---

## File Structure

| パス | 役割 |
|---|---|
| `astro.config.mjs` | site、static 出力、UnoCSS、sitemap、`redirects`（`/about`・`/works` → `/`） |
| `uno.config.ts` | 旧テーマを引き継ぐ（presetUno → presetWind3） |
| `src/consts.ts` | `SITE_*`、`NAV`、`CAREER`、`SKILLS`、`LINKS` |
| `src/layouts/Base.astro` | `<head>`（meta、OGP、favicon、フォント）、`<body>` の骨組み、`Stage`・`Header`・`Footer` |
| `src/styles/stage.css` | 帯、キャラ、背景、ヘッダー、ヒーローの入場アニメーションの state 別 CSS（プロトタイプから移植） |
| `src/components/Stage.astro` | `.bgimg`・`.band`・`.chara`・`.band-front` の層と、state を切り替える `<script>` |
| `src/components/Header.astro` | 固定ナビ（`NAV` から生成） |
| `src/components/Hero.astro` | アイコン、名前、肩書き、自己紹介、Career、Skills、リンク、「Works を見る」 |
| `src/components/Works.astro` / `WorkCard.astro` | Works セクションと作品1件分 |
| `src/components/Footer.astro` | © ビルド時の年、GitHub リポジトリへのリンク |
| `src/content.config.ts` / `src/content/works/*.md` | 作品のコレクション |
| `src/pages/index.astro` / `src/pages/404.astro` | ページ |
| `tests/dist.test.mjs` | `dist/` の HTML を検査する node:test |

削除するファイル：
- `app.config.ts`
- `src/app.tsx`、`src/entry-client.tsx`、`src/entry-server.tsx`、`src/global.d.ts`
- `src/routes/`、`src/libs/`、`src/md/`
- `src/components/*.tsx`
- `public/sitemap.xml`
- `tsconfig.eslint.json`
- `public/work-thumbnail/` のうち、`neoshowcase`・`game3`・`shinkan-bira` 以外

---

### Task 1: Astro の土台に置き換える

**Files:**
- 作成: `astro.config.mjs`、`src/layouts/Base.astro`、`src/pages/index.astro`（この時点では仮の中身）、`src/pages/404.astro`、`tests/dist.test.mjs`、`.node-version`（`24`）
- 変更: `package.json`、`uno.config.ts`、`tsconfig.json`、`biome.json`、`.gitignore`、`src/consts.ts`
- 削除: 上の「削除するファイル」のうち Solid と vinxi に関わるもの、`public/sitemap.xml`

**Interfaces:**
- 作るもの
  - `src/consts.ts`：`SITE_TITLE = "eyemono.moe Portfolio"`、`SITE_DESCRIPTION`（今の値のまま）、`SITE_URL = "https://eyemono.moe/"`
  - `Base.astro`：props は `{ title?: string }`。`<slot />` を `<main>` の中に出す。
  - `package.json` の scripts
    - `dev`: `astro dev`
    - `build`: `astro build`
    - `preview`: `astro preview`
    - `check`: `biome check .`
    - `check:apply`: `biome check --write .`
    - `test`: `astro build && node --test tests/`

- [ ] **Step 1: Node 24 に切り替え、依存を入れ替える**

  実行するコマンド：

  ```
  mise use node@24
  corepack use pnpm@12.15.0
  pnpm remove @mdx-js/rollup @solid-primitives/resize-observer @solidjs/meta @solidjs/router @solidjs/start solid-js vinxi solid-jsx @unocss/transformer-variant-group
  pnpm add astro@^7.4.2 @astrojs/sitemap@^3.7.4
  pnpm add -D unocss@^66.11.0 @unocss/astro@^66.11.0 @unocss/preset-wind3@^66.11.0 @unocss/reset@^66.11.0 @iconify-json/ri@latest @biomejs/biome@^2.6.2
  ```

  `pnpm biome migrate --write` で `biome.json` を v2 の形式に移行する。`.astro` ファイルも検査対象に含める。

- [ ] **Step 2: 落ちるテストを書く**（`tests/dist.test.mjs`）

  `readFileSync(new URL("../dist/...", import.meta.url))` で HTML を読み、次を確かめる。
  - `index has Japanese lang and OGP`
    - `dist/index.html` に `<html lang="ja"`、`property="og:image" content="https://eyemono.moe/OGP.webp"`、`<title>eyemono.moe Portfolio</title>` が含まれる。
    - `favicon.ico` は含まれない。
  - `old routes redirect to top`
    - `dist/about/index.html` と `dist/works/index.html` のどちらにも `http-equiv="refresh"` と `url=/` が含まれる。
  - `sitemap and static files exist`
    - `dist/sitemap-index.xml`、`dist/.well-known/nostr.json`、`dist/robots.txt` が存在する。
  - `404 page exists`
    - `dist/404.html` に `Page Not Found` が含まれる。

- [ ] **Step 3: `pnpm test` を実行し、失敗することを確かめる**

  期待する結果：astro の設定がまだないので、ビルドが失敗するか、テストが FAIL になる。

- [ ] **Step 4: 土台を実装する**

  - `astro.config.mjs`
    - `site: "https://eyemono.moe"`、`output: "static"`
    - `integrations: [UnoCSS({ injectReset: "@unocss/reset/tailwind-compat.css" }), sitemap()]`
    - `redirects: { "/about": "/", "/works": "/" }`
  - `uno.config.ts`
    - `presetUno` を `presetWind3` に置き換える。
    - variant-group は transformer として残す。`unocss` パッケージに同梱の `transformerVariantGroup` を使う。
    - theme と shortcuts は今のものをそのまま残す。
  - `Base.astro`
    - meta と OGP は、今の `entry-server.tsx` の内容を移す。ただし `favicon.ico` は外し、`lang` を `ja` にする。
    - フォントの preload は、`presetWebFonts` が出す URL と同じものにする。
  - `404.astro`：`<h1>Page Not Found</h1>`
  - `tsconfig.json`：`astro/tsconfigs/strict` を extends にする。`paths` の `~/*` は残す。
  - `.gitignore`：`dist/`、`.astro/`、`.superpowers/` を追加する。

- [ ] **Step 5: `pnpm test && pnpm check` を実行し、通ることを確かめる**

  期待する結果：4件とも PASS し、Biome もエラーなし。

- [ ] **Step 6: コミットする**

  `git add -A && git commit -m "chore: replace SolidStart with Astro"`

---

### Task 2: Works（コレクションと表示）

**Files:**
- 作成
  - `src/content.config.ts`
  - `src/content/works/streets.md`、`neoshowcase.md`、`game3.md`、`shinkan-bira.md`
  - `src/components/Works.astro`、`src/components/WorkCard.astro`
  - `public/work-thumbnail/streets.webp`
- 変更: `src/pages/index.astro`、`tests/dist.test.mjs`
- 削除: `src/md/`（残っていれば）、使わないサムネイル

**Interfaces:**
- 作るもの
  - コレクション名は `works`。loader は `glob({ pattern: "*.md", base: "./src/content/works" })`。
  - スキーマ：`{ title: string; tags: string[]; thumbnail: string /* /work-thumbnail/xxx.webp */; order: number }`
  - `Works.astro`：props なし。`<section class="works" id="works">` を出す。

- [ ] **Step 1: 落ちるテストを追加する**

  - `works lists 4 items in order`
    - `dist/index.html` の中で、`<h3>` の文言が出てくる順番が `["Streets", "NeoShowcase", "Game³ホームページ", "新勧パンフレットイラスト"]` と一致する。
  - `works texts avoid bare circle names`
    - `大学時代に所属していた創作サークル（traP）`、`大学の創作サークルが主催する` が含まれる。
    - `サークル内で使用されている` は含まれない。
  - `work links open in new tab`
    - `https://streets.eyemono.moe` を含む `<a` タグに `target="_blank"` と `rel="noopener noreferrer"` が付いている。

- [ ] **Step 2: `pnpm test` を実行し、失敗することを確かめる**

  期待する結果：上の3件が FAIL になる。

- [ ] **Step 3: 実装する**

  - **作品の本文**
    - 本文（説明と `### Links` のリスト）は spec の Works の表のとおりに書く。
    - NeoShowcase のリンクは、今の `src/md/neoshowcase.md` から写す。
    - 新勧のポストのリンクは x.com のドメインにする。
  - **Streets のサムネイル**
    - `https://raw.githubusercontent.com/eyemono-moe/streets/HEAD/.github/assets/screenshot.png` をスクラッチ領域にダウンロードする。
    - 幅 1200px の webp に変換する。`cwebp -resize 1200 0 -q 80`、または `sharp` を使う。
  - **外部リンク**
    - md の中のリンクに `target` と `rel` を付ける。方法は2つある。
      - 小さな rehype プラグインを `astro.config.mjs` の `markdown.rehypePlugins` に入れる。
      - または `rehype-external-links` を使う（`{ target: "_blank", rel: ["noopener", "noreferrer"] }`）。
    - 後者を推奨する。
  - **表示**
    - `WorkCard.astro` のマークアップとスタイル（`.work`、`.tags`、`.wl`、767px 以下では1列）は、プロトタイプから移植する。
    - 並び順は `order` の昇順にする。

- [ ] **Step 4: `pnpm test` を実行し、通ることを確かめる**

  期待する結果：すべて PASS。

- [ ] **Step 5: コミットする**

  `git commit -m "feat: works section with 4 items"`

---

### Task 3: Hero（プロフィール）

**Files:**
- 作成: `src/components/Hero.astro`
- 変更: `src/consts.ts`、`src/pages/index.astro`、`tests/dist.test.mjs`

**Interfaces:**
- 作るもの（`src/consts.ts` に追加）
  - `NAV: { label: string; href: string; external?: boolean }[]`
    - 中身は Top `#top`、Works `#works`、Blog `https://log.eyemono.moe`（external）。
  - `CAREER: { period: string; text: string }[]`：spec の Career 欄の4行を、この順のまま入れる。
  - `SKILLS: string[]`：`["TypeScript","Solid.js","React","Vue","Go","Node.js","Python"]`
  - `LINKS: { label: string; href: string }[]`：GitHub、X、Blog、Card。URL は spec の表のとおり。
- `Hero.astro` は `<section class="hero" id="top">` を出す。

- [ ] **Step 1: 落ちるテストを追加する**

  - `hero shows profile`
    - `Web Engineer`、`2025.4 -`、`ポケットサイン株式会社`、`2023.4 - 2025.3`、`東京工業大学 修士課程（退学）` が含まれる。
    - `<rt>アイモノ</rt>`、`<rt>モエ</rt>` が含まれる。
    - `SKILLS` の7つがすべて含まれる。
    - `正社員`、`フロントエンドエンジニア` は含まれない。
  - `hero has works button`
    - `class="to-works"` と `href="#works"` を持つ `<a` がある。
  - `hero links`
    - `https://card.eyemono.moe` と `https://x.com/eyemono_moe` を含む `<a` タグに `target="_blank"` が付いている。

- [ ] **Step 2: `pnpm test` を実行し、失敗することを確かめる**

- [ ] **Step 3: 実装する**

  - マークアップとスタイルは、プロトタイプの `.hero` 以下（`.name`、`.icon`、`.role`、`.intro`、`.blk`、`.tl`、`.chips`、`.links`、`.to-works`）から移植する。
  - 767px 以下のレイアウトも移植する。アイコンを上に大きく置き、中央寄せにする。
  - 入場アニメーション（`body:not([data-state=init])` のときにフェードインさせる指定）は、Task 4 の `stage.css` に置く。

- [ ] **Step 4: `pnpm test` を実行し、通ることを確かめる**

  期待する結果：すべて PASS。

- [ ] **Step 5: コミットする**

  `git commit -m "feat: hero profile"`

---

### Task 4: 演出（Stage と Header）

**Files:**
- 作成: `src/components/Stage.astro`、`src/components/Header.astro`、`src/styles/stage.css`
- 変更: `src/layouts/Base.astro`、`tests/dist.test.mjs`

**Interfaces:**
- 使うもの：`NAV`（Task 3）、`.hero`・`#top`・`#works`（Task 2・Task 3）
- 作るもの
  - `body[data-state]` の値は `"init" | "hero" | "content"` のいずれか。
  - `stage.css` の CSS 変数：`--nav-pad`、`--nav-item-w`、`--nav-item-h`、`--nav-gap`、`--nav-count`、`--nav-x`、`--nav-y`、`--tan`、`--hdr-l`、`--hdr-r`、`--band-header`

- [ ] **Step 1: 落ちるテストを追加する**

  - `body starts as hero and inline script switches to init`
    - `dist/index.html` の `<body` タグに `data-state="hero"` がある。
    - `<body` の直後、最初の `<script` までの間に、`dataset.state="init"` または `dataset.state = "init"` が含まれる。
  - `stage layers exist`
    - `class="bgimg"`、`class="band"`、`class="chara"`、`class="band-front"` がすべて含まれる。
  - `nav matches NAV`
    - `<header` の中に `href="#top"`、`href="#works"`、`href="https://log.eyemono.moe"` がこの順で出てくる。
    - Blog のリンクに `target="_blank"` が付いている。

- [ ] **Step 2: `pnpm test` を実行し、失敗することを確かめる**

- [ ] **Step 3: 実装する**

  - **`stage.css`**
    - プロトタイプの次の部分を移植する。
      - `:root` の変数
      - `.band`、`.chara`、`.bgimg`、`.band-front` と、state ごとの指定
      - `header` まわり
      - `.hero > .hero-inner > *` の入場アニメーション
      - 768〜1100px と 767px 以下のメディアクエリ
      - `prefers-reduced-motion`
    - プロトタイプにない指定を1つ追加する：`@media (max-width:400px) { :root { --nav-gap:16px } }`
    - `Base.astro` で import する。
  - **`Base.astro`**
    - `<body data-state="hero">` の直後に `<script is:inline>` を置き、`document.body.dataset.state = "init"` を実行する。
  - **`Stage.astro` の `<script>`**
    - プロトタイプの `update()`、`requestAnimationFrame → setTimeout(120ms) で hero へ切り替える処理`、Works の IntersectionObserver を移植する。
    - 120ms 後に state を決めるときは、無条件に `"hero"` にせず、`update()` と同じ判定で `hero` か `content` かを決める（Review Focus 2）。

- [ ] **Step 4: `pnpm test` を実行し、通ることを確かめる**

  期待する結果：すべて PASS。

- [ ] **Step 5: 手動で確かめる**

  `pnpm dev` で起動し、ブラウザで次の点を見る。
  - 幅 1440 / 1920：開いた直後に帯とキャラが入ってくる。スクロールすると帯がヘッダーの形に変わり、キャラは画面外へはけ、背景が薄くなり、ナビが降りてくる。帯の下端が Blog の右下に接している。Works のカードが帯の下にもぐる。
  - 幅 800：キャラが文字に重ならない。
  - 幅 375 / 320：キャラは表示されない。アイコンが大きく中央に出る。ナビが1行に収まる。
  - `/#works` を直接開く：最初から `content` の状態になる。
  - DevTools で `prefers-reduced-motion: reduce` をエミュレートする：アニメーションが動かない。
  - DevTools で JS を無効にする：ヒーローが表示される。
  - 見た目をプロトタイプ（`/files/` のパスを本番のパスに置き換えたもの）と並べて見比べ、目立つ差がない。

- [ ] **Step 6: コミットする**

  `git commit -m "feat: band/character stage and header"`

---

### Task 5: フッター、README、CI、Vercel

**Files:**
- 作成: `src/components/Footer.astro`
- 変更: `src/layouts/Base.astro`、`README.md`、`.github/workflows/ci.yaml`、`vercel.json`、`tests/dist.test.mjs`

- [ ] **Step 1: 落ちるテストを追加する**

  - `footer shows build year`
    - `© ${new Date().getFullYear()} eyemono.moe` と `https://github.com/eyemono-moe/portfolio` が含まれる。
  - `ci has no vercel deploy`
    - `.github/workflows/ci.yaml` に `vercel` も `deploy` も含まれない。
  - `vercel git deploy enabled`
    - `vercel.json` に `deploymentEnabled` が含まれない（ファイル自体を削除した場合も合格とする）。

- [ ] **Step 2: `pnpm test` を実行し、失敗することを確かめる**

- [ ] **Step 3: 実装する**

  - **フッター**：今の `Footer.tsx` を Astro に移す。年はビルド時に `new Date().getFullYear()` で入れる。
  - **`vercel.json`**：`deploymentEnabled` の指定だけなので、ファイルごと削除する。
  - **`ci.yaml`**
    - ジョブは `check` と `build` の2つにする。
    - `build` では `pnpm test` を実行する。
    - 使う action：`actions/checkout`、`pnpm/action-setup`、`actions/setup-node` の、Node 24 で動く最新のメジャーバージョン。
    - setup-node には `node-version-file: .node-version` を指定する。
  - **README**：「powered by Astro」に書き換え、開発コマンド（`pnpm dev`、`pnpm test`）を載せる。

- [ ] **Step 4: `pnpm test && pnpm check` を実行し、通ることを確かめる**

  期待する結果：すべて PASS。

- [ ] **Step 5: コミットする**

  `git commit -m "chore: footer, CI without deploy, Vercel git integration"`

---

### Task 6: 仕上げの確認と引き継ぎ

- [ ] **Step 1:** 掃除する。`pnpm install --frozen-lockfile && pnpm check && pnpm test` を、クリーンな状態で実行する。

  期待する結果：すべて成功する。

- [ ] **Step 2:** 削除漏れを確かめる。`git ls-files src public | sort` の結果に、File Structure と残すと決めたファイル以外が含まれていない。

- [ ] **Step 3:** オーナーに作業を依頼する。
  - Vercel のダッシュボードで Git 連携と Framework Preset（Astro）を確認する。
  - `VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID` の secrets を削除する。
  - デプロイされたら、`https://eyemono.moe/.well-known/nostr.json` に `eyemono.str` が入っていることを確かめる。
