
export default {
  preset: 'ts-jest/presets/js-with-babel-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': "babel-jest",//ここをbabel-jestに置き換えないとエラーが出る。ts-jestではだめ。
  },
  moduleFileExtensions: ['ts', 'js'],
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};
