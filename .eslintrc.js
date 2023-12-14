const OFF = 0;
const WARNING = 1;
const ERROR = 2;
module.exports = {
  root: true,
  extends: ['@modern-js', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  rules: {
    curly: OFF,
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
  },
};
