const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    scrollBehavior: "bottom",
    includeShadowDom: true,
    browsers: [
      {
        name: "chrome",
        family: "chromium",
        channel: "stable",
        displayName: "Chrome",
        version: "128.0.6613.138",
        path: "C:Program Files (x86)GoogleChromeApplicationchrome.exe",
        minSupportedVersion: 64,
        majorVersion: "128",
      },
      {
        name: "firefox",
        family: "firefox",
        channel: "stable",
        displayName: "Firefox",
        version: "127.0",
        path: "C:Program FilesMozilla Firefox\firefox.exe",
        minSupportedVersion: 86,
        majorVersion: "127",
      },
    ],
    responseTimeout: 20000,
    retries: {
      runMode: 3,
      openMode: 0,
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    viewportHeight: 1080,
    viewportWidth: 1920,
    execTimeout: 60000,

    baseUrl: "https://12go.com/en",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
