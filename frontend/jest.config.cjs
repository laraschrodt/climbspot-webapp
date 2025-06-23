/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json"
    }
  },
moduleNameMapper: {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
},

};
