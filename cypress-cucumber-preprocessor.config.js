module.exports = {
  commonPath: "cypress/e2e/common",
  stepDefinitions: "cypress/e2e",
  cucumberJson: {
    generate: true,
    outputFolder: "artifacts/run-results/cucumber-json",
    filePrefix: "",
    fileSuffix: ".cucumber",
  },
};
