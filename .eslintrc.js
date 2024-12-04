module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended'
	],
	env: {
		node: true,
		browser: true,
		es2021: true,
		jest:
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'prettier/prettier': ['warn', { endOfLine: 'auto' }],
		'no-console': 1
	},
	overrides: [
		{
			files: ['*.js', '*.cjs'], // Для конфигурационных файлов
			env: {
				node: true
			},
			parserOptions: {
				sourceType: 'module'
			}
		}
	],
	settings: {
		react: {
			version: 'detect' // Автоматическое определение версии React
		}
	}
}
