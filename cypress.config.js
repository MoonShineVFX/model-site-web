const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'd894t1',
  viewportWidth: 1536,
  viewportHeight: 960,
  defaultCommandTimeout: 10000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:1006',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
