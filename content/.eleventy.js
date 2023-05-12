const shortcodes = require('./shortcodes');
const path = require('path');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addPassthroughCopy('writing/articles/**/*.png');
  eleventyConfig.addPassthroughCopy('writing/medium/**/*.png');

  for (const key in shortcodes) {
    eleventyConfig.addJavaScriptFunction(key, shortcodes[key]);
  }

  eleventyConfig.dir = { output: path.join(__dirname, '..', 'docs') };

  eleventyConfig.addWatchTarget('./writing');

  return eleventyConfig;
};
