const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  root: true,
  plugins: ["import"],
  extends: [
    "eslint:recommended",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
  },
  rules: {
    "no-console": [ERROR, { allow: ["warn", "error"] }],
    "quotes": [ERROR, "single"],
    "indent": [ERROR, 2],
    "prefer-const": ERROR,
    "no-multiple-empty-lines": ERROR,
    "lines-between-class-members": ERROR,
    "arrow-parens": [ERROR, "as-needed", { "requireForBlockBody": true }],
    "max-len": [ERROR, {
      "code": 80, "ignoreComments": true, "ignoreUrls": true
    }],
    "semi": [ERROR, "always", { "omitLastInOneLineBlock": true }],
    "prefer-object-spread": ERROR
  }
};
