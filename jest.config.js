// jest.config.js
const { defaults } = require("jest-config");
module.exports = {
  verbose: true,
  testTimeout: 30000,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts"],
};
