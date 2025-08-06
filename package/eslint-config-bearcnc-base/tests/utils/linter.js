import { ESLint } from 'eslint';
import getTestCasesData from './markdown.js';
import { expect } from 'chai';

const DEBUG = false; // Set to true to enable debug logging

class Linter {
  constructor({ configFilePath, docPath, configType, globalEslintConfig = [] }) {
    this.configFilePath = configFilePath;
    this.docPath = docPath;
    this.configType = configType;
    // globalEslintConfig is an array of strings
    this.globalEslintConfig = globalEslintConfig;
    this.globalEslintConfigString = Array.isArray(globalEslintConfig) ? globalEslintConfig.join(', ') : '';
    this.eslint = new ESLint({
      overrideConfigFile: this.configFilePath,
    });
  }

  async checkRule(rule, { ignoreGlobalConfig = false } = {}) {
    const { availability, testCases } = getTestCasesData(rule, this.docPath);

    // check if the config type is available for the rule
    expect(availability, `Config type "${this.configType}" should be available for rule "${rule}"`).to.include(
      this.configType,
    );

    // Add test for expectedErrors and code goodness consistency
    testCases.forEach(({ expectedErrors, isGood, title }) => {
      if (expectedErrors > 0) {
        expect(isGood, `Test case "${title}" should be "bad" when expectedErrors > 0`).to.be.false;
      } else {
        expect(isGood, `Test case "${title}" should be "good" when expectedErrors === 0`).to.be.true;
      }
    });

    // check if the code has expected errors counts
    for (let i = 0; i < testCases.length; i += 1) {
      const { code, expectedErrors, title } = testCases[i];
      const codeWithGlobalConfig =
        !ignoreGlobalConfig && this.globalEslintConfigString
          ? `/* eslint ${this.globalEslintConfigString} */\n${code}`
          : code;
      const result = await this.eslint.lintText(codeWithGlobalConfig);
      if (DEBUG) {
        console.log(`[${title}]\n`);
        console.log(result[0]);
        console.log('------------------------------\n');
      }
      const { errorCount, warningCount } = result[0];

      expect(errorCount + warningCount, `Test case "${title}" should have ${expectedErrors} errors`).to.equal(
        expectedErrors,
      );

      // Additional check: if errors are expected, ensure all errors are for the correct rule
      if (expectedErrors > 0) {
        result[0].messages.forEach((msg, i) => {
          expect(
            msg.ruleId,
            `Test case "${title}" error #${i} should be for rule '${rule}' but got '${msg.ruleId}'`,
          ).to.equal(rule);
        });
      }
    }
  }
}

export default Linter;
