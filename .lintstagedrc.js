module.exports = {
    // Type check TypeScript files
    'components/**/*.tsx': () => [
      'tsc --noEmit',
      'eslint --fix'
    ],
    'pages/**/*.(ts|tsx)': () => [
      'tsc --noEmit',
      'eslint --fix'
    ],
    'pages/*.(ts|tsx)': () => [
      'tsc --noEmit',
      'eslint --fix'
    ],
    'types/*.ts': () => [
      'tsc --noEmit',
      'eslint --fix'
    ],
};