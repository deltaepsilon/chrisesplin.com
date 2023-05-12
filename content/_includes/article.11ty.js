const Medium = require('./medium.11ty')

Medium.data = function() {
  return {
    name: 'Article',
    layout: 'writing',
  };
}

module.exports = Medium
