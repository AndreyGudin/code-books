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
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/naming-convention': 'warn',
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: ['data-testid']
      }
    ]
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': off
      }
    }
  ]
};
