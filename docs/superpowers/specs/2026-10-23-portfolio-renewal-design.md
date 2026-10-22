# eyemono.moe リニューアル設計（Astro 移行＋1ページ化）

- 日付: 2026-10-23
- 動くプロトタイプ: [2026-10-23-portfolio-renewal-prototype.html](./2026-10-23-portfolio-renewal-prototype.html)
  - 画像は `/files/*.webp` などを参照しているため、リポジトリ内では画像が表示されない。対応は次のとおり。
    - `/files/chara.webp` と `/files/bg.webp` → `public/background/`
    - `/files/icon-blink.svg` → `src/assets/`
    - `/files/neoshowcase.webp`、`/files/game3.webp`、`/files/shinkan-bira.webp` → `public/work-thumbnail/`
    - `/files/streets.png` → https://raw.githubusercontent.com/eyemono-moe/streets/HEAD/.github/assets/screenshot.png
  - レイアウト、文言、CSS、JS は**このプロトタイプが正**。この文書はその意図と、プロトタイプからは読み取れない決定事項をまとめたもの。

## 目的

ゲームや SNS、イベントで出会った人が、アドレスバーに `eyemono.moe` と打つだけで「この人がどんな経歴を持ち、どんな技術を持っているか」をすぐ分かるようにする。採用向けのポートフォリオではない。

その場で渡す名刺の役割は別サイトの card.eyemono.moe（eyemono-moe/name-card）が担う。eyemono.moe は、名刺を受け取った人が「もう少し知りたい」と思ったときに読むページという位置づけにする。

あわせて、2024 年頃から止まっている情報（大学在籍、業務委託、作品一覧など）を最新にする。

## ゴールと、やらないこと

**ゴール**
- SolidStart（vinxi）から Astro と素の JS に置き換える。Solid などの UI フレームワークは使わない。
- サイトを1ページにまとめる。最初の画面でプロフィール（経歴・スキル・リンク）が分かり、スクロールすると作品を読める。
- 元のサイトの「ぬるぬる動く黄緑の帯」と「キャラ画像」の演出を、1ページ構成に合わせて作り直す。
- Vercel の Git 連携だけでデプロイされる状態にする。

**やらないこと**
- card.eyemono.moe の修正。後日、別作業として行う。
- Cloudflare への移行。当面は Vercel のまま。
- ブログ（log.eyemono.moe）への変更。

**失敗とみなす状態**
- 動いてはいるが、元のサイトの帯とキャラの演出の雰囲気が失われている。
- スマホで読みにくい。文字と画像が重なる、ヘッダーの文字が読めない、など。

## ページ構成

`/` の1ページだけにする。

1. **ヒーロー**（最初の画面、高さ 100vh 以上）
   - 内容は上から順に、アイコン（`src/assets/icon-blink.svg`）、名前（ルビ付き）、肩書き、自己紹介2行、Career、Skills、リンク。
   - 下端に「Works を見る ↓」ボタンを置く（`#works` へのアンカーリンク）。
2. **Works**（`#works`）：4件を折りたたまずに全文表示する。
3. **フッター**：© 年と GitHub リポジトリへのリンク。

### 固定の文言

| 項目 | 内容 |
|---|---|
| 名前 | `eyemono.moe`。ルビは eyemono → アイモノ、moe → モエ |
| 肩書き | `Web Engineer` |
| 自己紹介 | Web フロントと 3DCG に興味があります。／かわいくてかっこいいものが好きです。 |
| Career | 2025.4 - ポケットサイン株式会社 ／ 2023.8 - 2025.3 同社 業務委託エンジニア ／ 2023.4 - 2025.3 東京工業大学 修士課程（退学） ／ 2019.4 - 2023.3 東京工業大学 生命理工学院 |
| Skills | TypeScript, Solid.js, React, Vue, Go, Node.js, Python。すべて同じ太線のタグにし、階層は付けない |
| リンク | GitHub（https://github.com/eyemono-moe）、X（https://x.com/eyemono_moe）、Blog（https://log.eyemono.moe）、Card（https://card.eyemono.moe） |
| ナビ | Top（`#top`）/ Works（`#works`）/ Blog（外部リンク、別タブで開く） |

元の About ページにあった Interests と旧ハンドルネーム（でっていう）は載せない。

### Works（この順に4件）

traP に所属しなくなったため、「サークル」「traP」とだけ書いても伝わらない。「大学時代に所属していた創作サークル」と書く。

1. **Streets**
   - タグ: WebApp / Solid.js / TypeScript / Nostr
   - 説明: ブラウザで使える Nostr クライアントです。タイムラインや通知、検索結果をカラムにして並べられます。
   - リンク: https://streets.eyemono.moe 、リポジトリ https://github.com/eyemono-moe/streets
   - サムネイル: streets リポジトリの `.github/assets/screenshot.png` を webp に変換して `public/work-thumbnail/streets.webp` に置く。
2. **NeoShowcase**
   - タグ: WebApp / Solid.js / TypeScript
   - 説明: 大学時代に所属していた創作サークル（traP）で運用されている PaaS 基盤です。メンバーが作った Web アプリを手軽に公開できます。フロントエンドの実装を担当しました。
   - リンク: 現在の `src/md/neoshowcase.md` と同じ（紹介ブログ、リポジトリ、技育展2023 スライド）。
3. **Game³ホームページ**
   - タグ: WebApp / Nuxt / TypeScript
   - 説明: 大学の創作サークルが主催する、ゲーム制作者向けの展示・交流イベント「Game³」のホームページです。フロントエンドの実装を担当しました。
   - リンク: https://game3.trap.games/
4. **新勧パンフレットイラスト**
   - タグ: Illust / Blender
   - 説明: 大学時代に所属していた創作サークルの、新入生勧誘パンフレット用イラストを Blender で作成しました。デザイン、レイアウト、タイポグラフィは他のサークルメンバーが担当しています。
   - リンク: イラスト紹介ポスト https://x.com/d_etteiu8383/status/1375953569111662595
   - スマホではヒーローにキャラが出ないため、この作品がキャラのイラストを見せる役割も兼ねる。

作品のレイアウトは、左にサムネイル（16:10、`object-fit: cover`）、右に本文。767px 以下では縦に1列にする。画面に入ったときにふわっと表示する。

## 演出

元のサイトは、URL のパスから `data-state` を作り、CSS transition で帯とキャラを動かしていた。今回は同じ考え方で、**スクロール位置から `body[data-state]` を切り替える**。

| state | いつ | 帯 | キャラ（デスクトップのみ） | 背景画像 `bg.webp` |
|---|---|---|---|---|
| `init` | 読み込み直後（約120ms） | 幅0 | 画面の右外 | 不透明度 0 |
| `hero` | ヒーローの下端が画面の高さの 50% より下にある間 | 左半分を斜めに覆う形（元のトップページと同じ） | 元のトップページと同じ位置 | 不透明度 1 |
| `content` | ヒーローの下端が画面の高さの 50% より上に来たとき | 斜めのヘッダーの形 | 画面の右外へはける | 不透明度 0.2、元の Works ページと同じ位置 |

- 判定には IntersectionObserver を使わず、スクロール位置を使う。スマホではヒーローが画面より縦に長くなるので、IntersectionObserver の比率では誤判定するため。
- **帯は `clip-path: polygon()` の四角形で描く。** `transform: skew` は使わない。どの state も4頂点で書くので、`clip-path` の transition だけで形が変わる。
- **ヘッダーの形での帯の下端**は、ナビ右端の Blog の右下（余白 x+12px、y+8px）を通る 5° の直線にする。座標は、ナビの寸法を CSS 変数で固定して `calc()` だけで求める。JS は使わない。変数は `--nav-pad`、`--nav-item-w: 80px`、`--nav-item-h: 40px`、`--nav-gap: 48px`、`--nav-count: 3`。帯の右側は画面の上にはみ出してよい。
- **ヘッダーの座布団**：帯は z-index が負の層にあるので、スクロールしたコンテンツが上に重なる。そこで、同じ形の `.band-front`（z-index 9、薄い drop-shadow 付き）を `content` state になってから 0.55s 遅れてフェードインさせる。こうするとコンテンツが帯の下にもぐる見え方になり、ナビの文字が読める。
- ナビはヒーローでは画面の上に隠れていて、`content` で降りてくる。現在の位置に合わせて active の下線を付ける。
- ヒーローの各要素は、`init` から `hero` に変わるときに左から順にフェードインする。
- `prefers-reduced-motion: reduce` のときは、transition とアニメーションをすべて止める。

### 画面幅ごとの違い

- **1101px 以上**：キャラの位置は元のサイトと同じ `right calc(25% - 200px) bottom -180px`。
- **768〜1100px**：キャラが文字に重ならないよう、キャラの体の左端（画像の約 34% の位置）が `50vw + 16px` に来るように、`left` 基準で位置を計算する。
- **767px 以下**
  - キャラは表示しない。
  - `hero` の帯は高さ 300px の上帯（傾き 5°）にする。帯が上にある間は、背景画像を `content` と同じ「薄い」状態にする。
  - ヒーローの中身は縦方向の中央にそろえる。アイコンを大きく（`min(44vw, 180px)`）上に置き、名前・肩書き・自己紹介・リンクは中央寄せ、Career と Skills は左寄せにする。
  - 「Works を見る」ボタンは中央に置く。

## 技術方針

- **Astro**：静的出力で、アダプタは使わない。インタラクションは `<script>` に素の JS で書く。分量は state の切り替えと Works のフェードイン程度。
- **UnoCSS**：`@unocss/astro` で入れ、現在の `uno.config.ts` のテーマを引き継ぐ。引き継ぐのは色（accent / text / ui）、フォントサイズのトークン、Noto Sans JP の web font、icons。
  - プロトタイプの CSS をユーティリティクラスに書き直すか、`<style>` のまま持ち込むかは実装する人に任せる。
  - ただし、帯の `clip-path` の計算と state ごとの切り替えは、CSS 変数を使ったまとまった CSS として持つほうが読みやすい。
- **作品データ**：Content Collections（`src/content/works/*.md`）にする。frontmatter は title、tags、thumbnail、順序。本文は Markdown（説明と Links）。
- **プロフィールデータ**（Career、Skills、リンク）：ページか、データファイルに直接書く。どちらにするかは実装する人に任せる。
- **旧 URL**：`/about` と `/works` は `/` にリダイレクトする（Astro の `redirects` を使う）。404 ページは残す。
- **メタ情報**
  - `<html lang="ja">` にする。
  - OGP と Twitter card の内容（タイトル、説明、`/OGP.webp`）は今のものを引き継ぐ。
  - 存在しない `/favicon.ico` への参照は消す。
  - `public/.well-known/nostr.json` と `robots.txt` はそのまま残す。
  - 手書きの `sitemap.xml` は `@astrojs/sitemap` に置き換える。
- **フッターの年**：ビルドした時点の年を入れる。
- **使わなくなるもの**：次のファイルは削除する。
  - 今回載せない作品の md
  - 今回載せない作品のサムネイル
  - Solid、vinxi、mdx 関連の依存
  - `src/libs/useModal.tsx` などの Solid コード
  - `app.config.ts`
- **開発環境**
  - Node は現行の LTS にする（`engines` も更新する）。
  - pnpm と Biome は最新版にする。
  - Biome の設定は新しいバージョンに合わせて移行する。
  - README の「powered by solid-start」を Astro に書き換える。
- **ローカルの作業ファイル**：`.superpowers/` を `.gitignore` に追加する。

## デプロイ

- Vercel の Git 連携でデプロイする。
  - `vercel.json` の `git.deploymentEnabled.main: false` を外す。
  - Framework Preset は Astro にする。
- GitHub Actions は check（Biome）と build だけにする。
  - deploy ジョブと `amondnet/vercel-action` を削除する。
  - 前回のデプロイは、この action に入っている Vercel CLI が古くて失敗していた（2026-09-12 の run 34702476340）。そのため、nostr.json の更新が本番に反映されていない。
  - 各 action は、Node 24 で動く最新のメジャーバージョンに上げる。
- 作業者（リポジトリのオーナー）にやってもらうこと
  - Vercel のプロジェクトがこのリポジトリと Git 連携していることを確認する。
  - 不要になった secrets（`VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID`）を削除する。

## 実装する人に任せる部分

- Astro、UnoCSS、各インテグレーションのバージョン選び（最新の安定版）と、ディレクトリ構成。
- コンポーネントの分け方。Hero、Header、Band、WorkCard などの単位を想定している。
- サムネイル画像の最適化方法（`astro:assets` を使うかどうか）。
- 細かいアニメーションの数値。基本はプロトタイプに合わせる。
