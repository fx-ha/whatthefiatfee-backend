module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 },
  ignorePatterns: ['node_modules/*', 'src/migrations/', '!.prettierrc.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:prettier/recommended', // Prettier plugin
  ],
  rules: {
    'import/no-cycle': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-types': 'warn',
    'no-restricted-properties': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'max-classes-per-file': 'off',
    'no-continue': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    // return types on functions only where useful
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
  },
}
