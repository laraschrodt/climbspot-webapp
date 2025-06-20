/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest"],
  },
  moduleNameMapper: {
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
  },
};
