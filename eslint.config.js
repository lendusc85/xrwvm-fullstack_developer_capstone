module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "semi": "error",
      "quotes": ["error", "single"],
      "camelcase": "error",
      "no-plusplus": "error",
      "no-multiple-empty-lines": "error",
      "no-unused-vars": "error",
      "no-duplicate-imports": "error"
    },
  },
];