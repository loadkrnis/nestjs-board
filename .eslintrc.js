module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-node'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jest-formatting/recommended',
        'eslint-config-async',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        'no-console': 'error',
        'curly': 1,
        'arrow-body-style': ['error', 'as-needed'],
        'eqeqeq': ['error', 'always'],
        'no-else-return': ['error', {allowElseIf: false}],
        'max-nested-callbacks': ["error", 5],
        'no-await-in-loop': 'off',
        'require-atomic-updates': 'off',
    },
};
