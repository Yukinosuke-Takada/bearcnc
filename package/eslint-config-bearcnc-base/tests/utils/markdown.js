import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DOC_PATH = '../../README.md';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// helper function to remove common leading indentation
function dedent(str) {
  const lines = str.replace(/\t/g, '  ').split('\n');
  // Ignore empty lines at start/end
  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  // Find minimum indentation (ignore empty lines)
  const indents = lines
    .filter(line => line.trim())
    .map(line => line.match(/^ */)[0].length);
  const minIndent = indents.length ? Math.min(...indents) : 0;
  // Remove minIndent spaces from each line
  return lines.map(line => line.slice(minIndent)).join('\n');
}

function getTestCasesData(rule) {
  // Read the README.md file
  const readmePath = path.resolve(__dirname, DOC_PATH);
  const readmeContent = fs.readFileSync(readmePath, 'utf8');

  // extract the section under "## Rules"
  const sectionsByH2 = readmeContent.split('\n## ');
  const rulesSection = sectionsByH2.find(section => section.startsWith('Rules'));
  
  if (!rulesSection) {
    throw new Error('Rules section not found in README.md');
  }

  // find the section for the specific rule
  const rules = rulesSection.split('\n- ');
  const rule = rules.find(item => {
    const firstLine = item.split('\n')[0]; // only search it in the bullet point line
    return firstLine.includes(`eslint: [\`${rule}\`]`);
  });
  if (!rule) {
    throw new Error(`Rule "${rule}" not found in Rules section`);
  }

  // extract availability from the specific rule
  // **Availability:** `es5`, `es6` will return ['es5', 'es6']
  const lines = rule.split('\n');
  const availabilityLine = lines.find(line => line.includes('**Availability:**'));
  if (!availabilityLine) {
    throw new Error(`Availability not found for rule "${rule}"`);
  }
  let availability = [];
  const formattedAvailabilityLine = availabilityLine.split('(')[0] // ignore what's written in ()
  const availabilityLineBits = formattedAvailabilityLine.split('`');
  for (let i = 1; i < availabilityLineBits.length; i += 2) {
    availability.push(availabilityLineBits[i]);
  }

  // extract test case sections from the specific rule
  const markerRegex = /\n\s*(Good:|Bad:)\s*([\s\S]*?)(?=\n\s*(Good:|Bad:)|$)/g;
  const testCaseSections = [];
  let markerMatch;
  while ((markerMatch = markerRegex.exec(rule)) !== null) {
    testCaseSections.push({
      isGood: markerMatch[1] === 'Good:',
      code: markerMatch[2].trim(),
    });
  }
  if (testCaseSections.length === 0) {
    throw new Error(`No test cases found for rule "${rule}"`);
  }

  // extract properties from test cases section
  let testCases = [];
  for (const section of testCaseSections) {
    const title = rule + ' case ' + (testCases.length + 1);

    const commentOutBits = section.code.split('[//]: #');
    if (commentOutBits.length === 1) {
      throw new Error(`Comment out section not found in test case for "${title}"`);
    }
    const commentOut = commentOutBits[1].split('\n')[0];
    const expectedErrorsMatch = commentOut.match(/expectedErrors:\s*(\d+)/);
    const expectedErrors = expectedErrorsMatch
      ? parseInt(expectedErrorsMatch[1], 10)
      : (() => {
          throw new Error(`expectedErrors not found in test case for "${title}"`);
        })();

    // Extract eslint config if present
    let eslintConfig = null;
    const eslintConfigMatch = commentOut.match(/eslint:\s*'([^']+)'/);
    if (eslintConfigMatch) {
      eslintConfig = eslintConfigMatch[1];
    }

    const codeSectionSplit = section.code.split('```js')
    if (codeSectionSplit.length === 1) {
      throw new Error(`Code section not found in test case for "${title}"`);
    }
    let code = dedent(codeSectionSplit[1].split('```')[0]);

    // Prefix eslint config if present
    if (eslintConfig) {
      code = `/* eslint ${eslintConfig} */\n` + code;
    }

    testCases.push({
      isGood: section.isGood,
      title,
      code,
      expectedErrors,
    });
  }

  return {
    availability,
    testCases,
  };
};

export { getTestCasesData as getTestCasesDataWithRule };
