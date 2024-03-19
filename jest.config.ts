import type { Config } from 'jest';
const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testRegex: TEST_REGEX,
  transform: {
    // "^.+\\.tsx?$": "ts-jest",
    // "^.+\\.jsx?$": "babel-jest",
    // "^.+\\.mjs$": "babel-jest",
  },
  testPathIgnorePatterns: [
    './build/',
    './node_modules/',
    './dist/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^~(.*)$': './src/$1',
  },
  modulePaths: ['./'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
