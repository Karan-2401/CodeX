const dotenv = require('dotenv');
dotenv.config({quiet:true});

const ENV = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE: process.env.NODE_ENV,
};

module.exports = ENV; 