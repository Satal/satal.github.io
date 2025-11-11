// ESLint v9 flat config format
// Migrated from .eslintrc

export default [
  {
    ignores: [
      '_includes/scripts/**/*.js', // Contains Jekyll/Liquid template syntax
      '_includes/search-providers/**/*.js' // Contains Jekyll/Liquid template syntax
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // jQuery
        $: 'readonly',
        jQuery: 'readonly',
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly'
      }
    },
    rules: {
      'no-console': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      'block-scoped-var': 'error',
      'default-case': 'error',
      'no-extra-bind': 'error',
      'camelcase': 'error',
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'eol-last': ['error', 'always']
    }
  }
];
