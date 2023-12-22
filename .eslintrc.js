const OFF = 0;
const WARNING = 1;
const ERROR = 2;
module.exports = {
  root: true,
  extends: ['@modern-js', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    curly: OFF,
    'react/prop-types': OFF,
    'react/react-in-jsx-scope': OFF,
    'react/display-name': OFF,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': [
      WARNING,
      { additionalHooks: 'useRecoilCallback' },
    ],
    'react/no-unknown-property': [
      ERROR,
      { ignore: ['colspan', 'css', 'data-*', 'tw'] },
    ],
    'react/jsx-key': WARNING,
    '@typescript-eslint/naming-convention': [
      ERROR,
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
        filter: {
          // you can expand this regex to add more allowed names
          regex: '^Window',
          match: false,
        },
      },
      {
        selector: 'enum',
        format: ['UPPER_CASE'],
      },
    ],
  },
};
