const { defaults } = require('jest-config')

// /** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
}

module.exports = config
