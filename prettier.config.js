module.exports = {
  printWidth: 100, // Angular style guide recommends 100 char line length
  tabWidth: 2, // Angular & Material style guide use 2 spaces
  useTabs: false, // Spaces over tabs
  semi: true, // Always use semicolons (matches Angular style guide)
  singleQuote: true, // Prefer single quotes for TS, JS, HTML
  quoteProps: 'as-needed', // Only quote object properties when necessary
  jsxSingleQuote: false, // JSX isn’t common in Angular, but keep this standard
  trailingComma: 'es5', // Trailing commas where valid in ES5 (objects, arrays)
  bracketSpacing: true, // { foo: bar } not {foo:bar}
  arrowParens: 'always', // Always include parens for arrow functions (e.g. (x) => x)
  endOfLine: 'lf', // Consistent LF line endings (especially helpful on cross-OS teams)
  embeddedLanguageFormatting: 'auto', // Format embedded languages like CSS in HTML
};
