export const SITE_TITLE = "eyemono.moe Portfolio";
export const SITE_DESCRIPTION =
  "eyemono.moe の ポートフォリオ | Web / 3DCG Developer";
export const SITE_URL = "https://eyemono.moe/";

export const NAV: { label: string; href: string; external?: boolean }[] = [
  { label: "Top", href: "/#top" },
  { label: "Works", href: "/#works" },
  { label: "Blog", href: "https://log.eyemono.moe", external: true },
];

export const CAREER: { period: string; text: string }[] = [
  { period: "2025.4 -", text: "ポケットサイン株式会社" },
  { period: "2023.4 - 2025.3", text: "東京工業大学 修士課程（退学）" },
  { period: "2019.4 - 2023.3", text: "東京工業大学 生命理工学院" },
];

export const SKILLS: string[] = [
  "TypeScript",
  "Solid.js",
  "React",
  "Vue",
  "Go",
  "Node.js",
  "Python",
];

export const LINKS: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/eyemono-moe" },
  { label: "X", href: "https://x.com/eyemono_moe" },
  { label: "Blog", href: "https://log.eyemono.moe" },
  { label: "Card", href: "https://card.eyemono.moe" },
];
