export const MAX_LINE_LENGTH = 100;

// Helper function to generate ESLint config comments without exceeding character limits
export default function generateEsComment(configs) {
  if (!Array.isArray(configs) || configs.length === 0) return '';

  const prefix = '/* eslint ';
  const suffix = ' */';

  let comment = prefix;
  for (let i = 0; i < configs.length; i += 1) {
    const config = configs[i];
    // Create a preview to check if it fits within the max line length
    const preview = `${comment.split('\n').pop()}${i === 0 ? '' : ', '}${config}${suffix}`;
    if (preview.length <= MAX_LINE_LENGTH) {
      comment += `${i === 0 ? '' : ', '}${config}`;
    } else {
      comment += `${suffix}\n${prefix}${config}`;
    }
  }
  comment += `${suffix}\n`;
  return comment;
}
