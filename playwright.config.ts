import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ['tests/automation.ts'], 
  use: {
    headless: false,
  },
  reporter:[["dot"], ["json",{
    outputFile: "jsonReports/jsonReport.json"
  }],["html",{
    open:"never"
  }]],
};

export default config;
