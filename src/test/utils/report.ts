const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./test-result/",
  reportPath: "./test-result/",
  durationInMS: true,
  displayDuration: false,
  pageTitle: "Automation testing Report",
  metadata: {
    browser: {
      name: "chrome",
      version: "120",
    },
    device: "DESKTOP-VT0E4J0",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Playwright Cucumber Automation using Typescript",
    data: [
      { label: "Project", value: "Sample Project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
    ],
  },
});