import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      '.husky/**',
      '.idea/**',
      '.vscode/**',
      'public/**',
      'node_modules',
      'package.json',
      'package-lock.json',
    ],
  },

  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['import', 'simple-import-sort'],
    rules: {
      'import/order': 'off',
      'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
      'jsx-quotes': ['error', 'prefer-double'],
      'import/newline-after-import': ['error', { count: 1 }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^type:react$', '^react$', '^type:next(/.*)?$', '^next(/.*)?$'],
            ['^type:@?\\w', '^@?\\w'],
            [
              '^type:@components(/.*)?$',
              '^@components(/.*)?$',
              '^type:@hooks(/.*)?$',
              '^@hooks(/.*)?$',
              '^type:@utils(/.*)?$',
              '^@utils(/.*)?$',
              '^type:@contexts(/.*)?$',
              '^@contexts(/.*)?$',
              '^type:@constants(/.*)?$',
              '^@constants(/.*)?$',
            ],
            ['^type:\\.\\.(?!/?$)', '^\\.\\.(?!/?$)', '^type:\\./', '^\\./'],
            ['^type:.*\\.(css|scss)$', '^.*\\.(css|scss)$'],
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'react-hooks/exhaustive-deps': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: true,
        },
        node: true,
      },
    },
  }),
];

export default eslintConfig;
