// card.eyemono.moe から引き継いだ「どこで会ったか」の記録。QR の ?at=イベント名 で最初に開いたときだけ保存する
export const STORAGE_KEY = "metAt-v1";
const MAX_NAME_LENGTH = 40;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** 日本時間の YYYY-MM-DD */
export const formatDate = (date) =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(date);

/** ?at=名前[&date=YYYY-MM-DD] を読む。date は card からの引き継ぎ用で、無ければ今日 */
export const parseMetAt = (search, now = new Date()) => {
  const params = new URLSearchParams(search);
  const name = [...(params.get("at") ?? "").trim()]
    .slice(0, MAX_NAME_LENGTH)
    .join("");
  if (!name) return null;
  const date = params.get("date") ?? "";
  return { name, date: DATE_RE.test(date) ? date : formatDate(now) };
};

export const toDisplayDate = (date) => date.replaceAll("-", ".");

/** 記録用のパラメータを除いたパス（履歴の置き換え用） */
export const stripMetAtParams = (href) => {
  const url = new URL(href);
  url.searchParams.delete("at");
  url.searchParams.delete("date");
  return url.pathname + url.search + url.hash;
};
