"use strict";

const pino = require(`pino`);
const {ENV} = require(`../constants`);

const LOG_FILE = `./logs/api.log`;

const isDevMode = process.env.NODE_ENV === ENV.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

console.log(process.env.LOG_LEVEL || defaultLogLevel);

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevMode
}, isDevMode ? process.stdout : pino.destination(LOG_FILE));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
