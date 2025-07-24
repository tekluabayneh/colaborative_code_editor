 // const { defineConfig } = require("cypress");
//
// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
//
 import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: "E2E/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "E2E/cypress/support/e2e.js",
    fixturesFolder: "E2E/cypress/fixtures",
    videosFolder: "E2E/cypress/videos",
    screenshotsFolder: "E2E/cypress/screenshots",
  },
})
