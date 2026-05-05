import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import {defineConfig} from 'eslint/config'
import type {ESLint} from 'eslint'

const jsonPlugin = json as unknown as ESLint.Plugin

export default defineConfig([
	{
		ignores: [
			'playwright-report/**',
			'test-results/**',
			'allure-results/**',
			'blob-report/**',
		],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: {js},
		extends: ['js/recommended'],
		languageOptions: {globals: globals.node},
	},
	tseslint.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		rules: {'no-useless-constructor': 'off'},
	},
	{
		files: ['**/*.jsonc'],
		plugins: {json: jsonPlugin},
		language: 'json/jsonc',
		extends: ['json/recommended'],
	},
	{
		files: ['**/*.md'],
		plugins: {markdown},
		language: 'markdown/gfm',
		extends: ['markdown/recommended'],
	},
])
