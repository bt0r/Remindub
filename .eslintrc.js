module.exports = {
  env: {
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    '@typescript-eslint'
  ],
  ignorePatterns: ["node_modules/*", "dist/*"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    "no-unused-vars": "off",

  }
}
