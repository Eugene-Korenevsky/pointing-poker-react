module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended",
    "prettier",// Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-new": 0,
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-console": "warn",
    "max-len": ["warn", { "code": 120 }],
    "indent": ["warn", 2, {
      "SwitchCase": 1
    }],
    "@typescript-eslint/indent": ["warn", 2, {
      "SwitchCase": 1
    }],
    "import/prefer-default-export": "off",
    "no-param-reassign": ["error", {
      "props": false
    }],
    "import/extensions": 0
  },
};