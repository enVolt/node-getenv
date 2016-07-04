var assert = require('assert');

var getenv = require('../lib/getenv');

var tests = {};

// order dependent test
tests['getenv.disableFallbacks() makes relying on fallbacks an error'] = function() {
  getenv.disableFallbacks();
  assert.throws(function() {
    getenv.string("url", "http://localhost");
  });
  getenv.enableFallbacks();
};

tests['getenv.stopError() should disable errors'] = function() {
  getenv.disableErrors();
  assert.strictEqual(getenv.string("url", "http://localhost"), 'http://localhost');
  assert(getenv.string("url"), undefined);
  getenv.enableErrors();
  assert.throws(function() {
    getenv.string("url");
  });
  assert.strictEqual(getenv.string("url", "http://localhost"), 'http://localhost');
  getenv.disableFallbacks();
  assert.throws(function() {
    getenv.string("url", "http://localhost");
  });
  getenv.enableFallbacks();
};


Object.keys(tests).forEach(function(key) {
  console.log('Test: %s', key);
  tests[key]();
});
