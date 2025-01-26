import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    rules: {
      'no-cond-assign': 'off',
      'no-irregular-whitespace': 'error',
      'no-unexpected-multiline': 'error',
      curly: ['error', 'multi-line'],
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-caller': 'error',
      'no-invalid-this': 'error',
      'no-multi-spaces': 'error',
      'no-multi-str': 'error',
      'no-new-wrappers': 'error',
      'no-throw-literal': 'error',
      'no-with': 'error',
      'prefer-promise-reject-errors': 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'array-bracket-newline': 'off', // eslint:recommended
      'array-bracket-spacing': ['error', 'never'],
      'array-element-newline': 'off', // eslint:recommended
      'block-spacing': ['error', 'never'],
      'brace-style': 'error',
      camelcase: ['error', { properties: 'never' }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': 'error',
      'comma-style': 'error',
      'computed-property-spacing': 'error',
      'eol-last': 'error',
      'func-call-spacing': 'error',
      indent: [
        'error',
        2,
        {
          CallExpression: {
            arguments: 2,
          },
          FunctionDeclaration: {
            body: 1,
            parameters: 2,
          },
          FunctionExpression: {
            body: 1,
            parameters: 2,
          },
          MemberExpression: 2,
          ObjectExpression: 1,
          SwitchCase: 1,
          ignoredNodes: ['ConditionalExpression'],
        },
      ],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'linebreak-style': 'error',
      'max-len': [
        'error',
        {
          code: 80,
          tabWidth: 2,
          ignoreUrls: true,
          ignorePattern: 'goog\.(module|require)',
        },
      ],
      'new-cap': 'error',
      'no-array-constructor': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-new-object': 'error',
      'no-tabs': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': 'error',
      'one-var': [
        'error',
        {
          var: 'never',
          let: 'never',
          const: 'never',
        },
      ],
      'operator-linebreak': ['error', 'after'],
      'padded-blocks': ['error', 'never'],
      'quote-props': ['error', 'consistent'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      semi: 'error',
      'semi-spacing': 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error',
        {
          asyncArrow: 'always',
          anonymous: 'never',
          named: 'never',
        },
      ],
      'spaced-comment': ['error', 'always'],
      'switch-colon-spacing': 'error',
      'arrow-parens': ['error', 'always'],
      'constructor-super': 'error', // eslint:recommended
      'generator-star-spacing': ['error', 'after'],
      'no-new-symbol': 'error', // eslint:recommended
      'no-this-before-super': 'error', // eslint:recommended
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'rest-spread-spacing': 'error',
      'yield-star-spacing': ['error', 'after'],
    },
  },
  {
    ignores: ['ex01/format_sample.js'],
  },
  eslintConfigPrettier,
];
