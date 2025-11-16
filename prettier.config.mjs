//
// /** @type {import('prettier').Config} */
// const config = {
//   plugins: ["prettier-plugin-tailwindcss"],
//   // tailwindcss
//   tailwindAttributes: ["theme"],
//   tailwindFunctions: ["twMerge", "createTheme"],
// };

// export default config;

// updated
/** @type {import('prettier').Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  printWidth: 100,
  tabWidth: 2,
};

export default config;
