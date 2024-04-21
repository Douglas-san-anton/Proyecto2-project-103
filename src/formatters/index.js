import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatters = {
  plain: formatPlain,
  stylish: formatStylish,
  json: JSON.stringify,
};

export default (ast, type) => {
  const format = formatters[type];
  if (!format) {
    throw new Error(`Unknown format '${type}'`);
  }
  return format(ast);
};
