// import globals from "globals";
// import pluginJs from "@eslint/js";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Backend: Node.js (CommonJS)
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // Node.js uses CommonJS
      globals: globals.node, // Node.js globals (e.g., process, __dirname)
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
  // Frontend: Vanilla JS (ES Modules)
  {
    files: ["public/**/*.js"], // Adjust this to match your frontend file location
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Frontend uses ES Modules
      globals: globals.browser, // Browser globals (e.g., window, document)
    },
  },
  pluginJs.configs.recommended,
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ignores: ["node_modules", "public/vendor", "views"],
  },
];
