const deIndent = require('de-indent');

/**
 * Webpack loader to remove indent.
 * @param source Source code.
 * @returns Code without indent.
 */
module.exports = (source) => {
  return deIndent(source);
};
