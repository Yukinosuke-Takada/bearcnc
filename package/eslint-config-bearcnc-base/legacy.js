import { defineConfig } from 'eslint/config';
import preEs6 from './rules/pre-es6/index.js';

export default defineConfig([
  preEs6,
	{
		languageOptions: {
			ecmaVersion: 5,
			sourceType: 'script'
		},
		rules: {
			'no-var': 'off',
		},
	},
]);
