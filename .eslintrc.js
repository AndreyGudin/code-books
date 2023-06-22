module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', 'react-hooks', 'i18next'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error',
    // Checks effect dependencies
    semi: 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-dynamic-delete': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: ['data-testid']
      }
    ]
  },
  globals: {
    __API__: true,
    __IS_DEV__: true,
    _PROJECT__: true
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 0
      }
    }
  ]
};
