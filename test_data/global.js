
var Process = require('process');

module.exports = {
   TestingEnvironment: Process.env.npm_config_TEST_ENV||'QA',
  
};
