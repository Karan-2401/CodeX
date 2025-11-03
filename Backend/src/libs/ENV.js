const dotenv = require('dotenv');
dotenv.config({quiet:true});

const ENV = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  INNGEST_EVENT_KEY:process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNIN_KEY: process.env.INNGEST_SIGNIN_KEY,
  STREAM_API_KEY:process.env.STREAM_API_KEY,
  STREAM_API_SECRET:process.env.STREAM_API_SECRET
};

module.exports = ENV; 