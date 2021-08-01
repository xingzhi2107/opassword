module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'react',
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  ignorePatterns: ['*.js'],
  rules: {
    'no-unused-vars': ['error', {args: 'none'}],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',

    'react/no-multi-comp': 'error',
    'react/button-has-type': 'error',
    'react/destructuring-assignment': ['error', 'always', {ignoreClassFields: true}],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'always' }],
    'react/jsx-max-depth': ['error', { 'max': 3 }],
    'react/jsx-max-props-per-line': ['error', { maximum: 3, when: 'always'}]
  },
};
