"use strict";

const apiRoutes = require(`../../api`);
const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);
const express = require(`express`);
const {getLogger} = require(`../../lib/logger`);

const logger = getLogger({name: `api`});

const {DEFAULT_PORT, API_PREFIX} = require(`../../constants`);
const app = express();

app.use(express.json());

app.use(API_PREFIX, apiRoutes);

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});


app.use((req, res, next) => {
  logger.error(`Route not found: ${req.url}`);
  res
    .status(StatusCodes.NOT_FOUND)
    .json(getReasonPhrase(StatusCodes.NOT_FOUND));
  next();
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});


module.exports = {
  name: `--server`,
  async run(arg) {
    const [userPort] = arg;
    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }
        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (e) {
      logger.error(`An error occurred: ${e.message}`);
      process.exit(1);
    }
  }
};
