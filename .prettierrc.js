module.exports = {
    semi: false,
    overrides: [
      {
        files: ['*.ts', '*.js', '*.tsx'],
        options: {
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
          bracketSpacing: false, // used in import {something} from 'something',
        },
      },
      {
        files: ['*.css', '*.md', '*.json'],
        options: {
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
        },
      },
    ],
  };
  