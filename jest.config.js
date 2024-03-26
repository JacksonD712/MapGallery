module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testMatch: [
    "<rootDir>/test/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/test/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
};