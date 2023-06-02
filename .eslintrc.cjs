// @ts-check

/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "plugin:solid/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: ["./tsconfig.json", "./tsconfig.eslint.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["solid"],
  rules: {},
  ignorePatterns: ["dist", "node_modules"],
};
