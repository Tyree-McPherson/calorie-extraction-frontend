module.exports = {
  preset: 'jest-preset-angular',

  // File for setting up the Angular test environment.
  setupFilesAfterEnv: ['./setup-jest.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],

  // Handle ES module dependencies.
  transformIgnorePatterns: ['node_modules/(?!@angular|@ngrx)'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },

  // Required for testing components.
  testEnvironment: 'jsdom',
  testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
  verbose: true,
};
