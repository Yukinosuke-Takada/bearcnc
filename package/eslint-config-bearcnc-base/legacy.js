import { defineConfig } from 'eslint/config';
import preEs6 from './rules/pre-es6';

export default defineConfig([
  preEs6,
	{
		languageOptions: {
			ecmaVersion: '5',
		},
		rules: {
			'no-var': 'off',
		},
	},
]);
