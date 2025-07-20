import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    // Enforce the use of object literal instead of Object constructor
    'no-object-constructor': 'error',

    // Enforce consistent use of object literal shorthand syntax
    '@stylistic/quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
  
    // Disallow the use of Object.prototype built-in methods directly on objects
    'no-prototype-builtins': 'error',
  }
});
