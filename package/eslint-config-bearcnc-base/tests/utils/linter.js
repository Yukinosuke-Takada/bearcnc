import { ESLint } from "eslint";
import { getTestCasesData } from "./markdown.js";
import { expect } from "chai";

const DEBUG = true; // Set to true to enable debug logging

class Linter {
  constructor(configFilePath, docPath, configType) {
    this.configFilePath = configFilePath;
    this.docPath = docPath;
    this.configType = configType;
    this.eslint = new ESLint({
      overrideConfigFile: this.configFilePath,
    });
  }

  async checkRule(rule) {
    const { availability, testCases } = getTestCasesData(rule, this.docPath);

    // check if the config type is available for the rule
    expect(availability, `Config type "${this.configType}" should be available for rule "${rule}"`).to.include(this.configType);
  
    // Add test for expectedErrors and code goodness consistency
    testCases.forEach(({ expectedErrors, isGood, title }) => {
      if (expectedErrors > 0) {
        expect(isGood, `Test case "${title}" should be "bad" when expectedErrors > 0`).to.be.false;
      } else {
        expect(isGood, `Test case "${title}" should be "good" when expectedErrors === 0`).to.be.true;
      }
    });

    // check if the code has expected errors counts
    for (const { code, expectedErrors, title } of testCases) {
      const result = await this.eslint.lintText(code);
      if (DEBUG) {
        console.log(`[${title}]\n`);
        console.log(result[0]);
        console.log("------------------------------\n");
      }
      const errorCount = result[0].errorCount;

      expect(errorCount, `Test case "${title}" should have ${expectedErrors} errors`).to.equal(expectedErrors);
    }
}
}

export { Linter };
