const { rmdir, existsSync, writeFileSync } = require("fs");
const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const cucumberHTMLReport = require("multiple-cucumber-html-reporter");

const CY_RUN_ARTIFACTS = `artifacts`;
const CY_RUN_REPORTS_PATH = `reports`;
const CY_RUN_LOG_FILE_NAME = `cypress-run.log`;
const ALLURE_RESULTS_PATH = `${CY_RUN_ARTIFACTS}/allure-results`;
const ALLURE_ENVPROP_FILE_NAME = "environment.properties";
const ALLURE_CATEGORY_FILE_NAME = "categories.json";
const CUCUMBER_HTML_REPORT_JSON_DIR = `${CY_RUN_ARTIFACTS}/run-results/cucumber-json`;
const CUCUMBER_HTML_REPORT_PATH = `${CY_RUN_REPORTS_PATH}/html-report`;
const CYPRESS_SPEC_PATTERN = "cypress/e2e/**/*.feature";
const CYPRESS_EXCLUDE_SPEC_PATTERN = "*.js";

module.exports = defineConfig({
  viewportHeight: 768,
  viewportWidth: 1366,
  increasedRequestTimeout: 5000,
  trashAssetsBeforeRuns: true,
  downloadsFolder: `${CY_RUN_ARTIFACTS}/downloads`,
  screenshotsFolder: `${CY_RUN_ARTIFACTS}/screenshots`,
  videosFolder: `${CY_RUN_ARTIFACTS}/videos`,
  screenshotOnRunFailure: true,
  video: false,
  videoUploadOnPasses: false,
  reporter: "spec",
  chromeWebSecurity: false,
  env: {
    STAGE: "dev",
    getStage() {
      return this.STAGE;
    },
    TAGS: "@smoke",
    allure: false,
    allureResultsPath: `${ALLURE_RESULTS_PATH}`,
    allureLogCypress: true,
    allureAttachRequests: true,
    allureOmitPreviousAttemptScreenshots: true,
  },
  e2e: {
    specPattern: CYPRESS_SPEC_PATTERN,
    excludeSpecPattern: CYPRESS_EXCLUDE_SPEC_PATTERN,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      on("file:preprocessor", cucumber());
      on("after:run", (results) => {
        generateCucumberHTMLReport(results);
        writeRunLog(results);
        setAllureEnvProp(results);
        setAllureCategories(results);
      });
      return config;
    },
  },
});

function deleteFolder(folderName) {
  if (existsSync(folderName)) {
    console.log("deleting folder %s", folderName);
    return new Promise((resolve, reject) => {
      rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(null);
      });
    });
  }
}

function writingToFile(text, filePath) {
  writeFileSync(filePath, text, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log(`file ${filePath} :: written is successfully;)`);
}

function generateCucumberHTMLReport(results) {
  cucumberHTMLReport.generate({
    jsonDir: CUCUMBER_HTML_REPORT_JSON_DIR,
    reportPath: CUCUMBER_HTML_REPORT_PATH,
    pageTitle: "Automated testing :: GhostDrive WEB App - HTML report",
    reportName: `Automated testing :: GhostDrive WEB App :: STAGE '${results.config.env.STAGE}'`,
    displayDuration: true,
    durationInMS: false,
    displayReportTime: true,
    metadata: {
      browser: {
        name: results.browserName,
        version: results.browserVersion,
      },
      device: "Virtual Machine",
      platform: {
        name: results.osName,
        version: results.osVersion,
      },
    },
    openReportInBrowser: false,
    customData: {
      title: "Settings of TestRun",
      data: [
        { label: "STAGE", value: results.config.env.STAGE },
        { label: "OS name", value: results.osName },
        { label: "Browser", value: results.browserName },
        { label: "viewport Height", value: results.config.viewportHeight },
        { label: "viewport Width", value: results.config.viewportWidth },
        { label: "Execution Start Time", value: results.startedTestsAt },
        { label: "Execution End Time", value: results.endedTestsAt },
      ],
    },
  });
}

function writeRunLog(results) {
  const SLACK_RESULT = {
    projectName: "Automated testing of GhostDrive WEB Application",
    envSTAGE: results.config.env.STAGE,
    envTAGS: results.config.env.TAGS,
    startedTestsAt: results.startedTestsAt,
    endedTestsAt: results.endedTestsAt,
    osName: results.osName,
    osVersion: results.osVersion,
    browserName: results.browserName,
    browserVersion: results.browserVersion,
    cypressVersion: results.cypressVersion,
    totalTests: results.totalTests,
    totalFailed: results.totalFailed,
    totalPassed: results.totalPassed,
    totalPending: results.totalPending,
    totalSkipped: results.totalSkipped,
  };
  const CY_RUN_TXT = `
  =================================================
  "Automated testing of GhostDrive WEB Application"
  =================================================
  STAGE               :: ${results.config.env.STAGE},
  TAGS                :: ${results.config.env.TAGS},
  started Tests at    :: ${results.startedTestsAt},
  ended Tests at      :: ${results.endedTestsAt},
  OS name             :: ${results.osName},
  OS --version        :: ${results.osVersion},
  Browser             :: ${results.browserName},
  Browser --version   :: ${results.browserVersion},
  Cypress --version   :: ${results.cypressVersion},
  -------------------------------------------------
  RUN RESULT 
  -------------------------------------------------
  total Tests         :: ${results.totalTests},
  total Failed        :: ${results.totalFailed},
  total Passed        :: ${results.totalPassed},
  total Pending       :: ${results.totalPending},
  total Skipped       :: ${results.totalSkipped},
  -------------------------------------------------

  reports >> http://ghostdrive-qa-allure.s3-website-us-east-1.amazonaws.com/
  `;
  writingToFile(CY_RUN_TXT, `${CY_RUN_REPORTS_PATH}/${CY_RUN_LOG_FILE_NAME}`);
}

function setAllureEnvProp(results) {
  if (!existsSync(results.config.env.allureResultsPath)) console.log(`allureResultsPath :: ${results.config.env.allureResultsPath} is NOT EXIST`);
  else {
    const fileName = `${results.config.env.allureResultsPath}/${ALLURE_ENVPROP_FILE_NAME}`;
    const ALLURE_ENV_PROP = `
  Project.Name="Automated testing of GhostDrive WEB Application"
  STAGE=${results.config.env.STAGE}
  Browser=${results.browserName}
  Browser.Version=${results.browserVersion}
  TAGS=${results.config.env.TAGS}
  OS.Name=${results.osName}
  OS.Version=${results.osVersion}
  Cypress.Version=${results.cypressVersion}`;

    writingToFile(ALLURE_ENV_PROP, fileName);
  }
}

function setAllureCategories(results) {
  if (!existsSync(results.config.env.allureResultsPath)) console.log(`allureResultsPath :: ${results.config.env.allureResultsPath} is NOT EXIST`);
  else {
    const fileName = `${results.config.env.allureResultsPath}/${ALLURE_CATEGORY_FILE_NAME}`;
    const ALLURE_CATEGORIES = `
  [
    {
      "name": "Ignored tests", 
      "matchedStatuses": ["skipped"] 
    },
    {
      "name": "Infrastructure problems",
      "matchedStatuses": ["broken", "failed"],
      "messageRegex": ".*bye-bye.*" 
    },
    {
      "name": "Outdated tests",
      "matchedStatuses": ["broken"],
      "traceRegex": ".*FileNotFoundException.*" 
    },
    {
      "name": "Product defects",
      "matchedStatuses": ["failed"]
    },
    {
      "name": "Test defects",
      "matchedStatuses": ["broken"]
    }
  ]`;

    writingToFile(ALLURE_CATEGORIES, fileName);
  }
}
