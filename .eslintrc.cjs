module.exports = {
  root: true,
  env: { node: true, es2022: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'script' },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/no-unresolved': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }]
  },
  ignorePatterns: ['backend/uploads/**', 'backend/coverage/**', 'node_modules/**']
};


