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
    'server/*.ts': () => [
      'tsc --noEmit',
      'eslint --fix'
    ],
    'utils/*.ts': () => [
      'tsc --noEmit',
      'eslint --fix'
    ],
};