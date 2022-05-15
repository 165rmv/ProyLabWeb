const dotenv = require('dotenv');
dotenv.config();
const appConfig = {
  env: process.env.NODE_ENV || 'development',
  express_port: process.env.EXPRESS_PORT || 3306,
  secret: process.env.APP_SECRET || 'YOU_SHOULD_NOT_USE_THIS_SECRET',
}

module.exports = appConfig;