"use strict";

const chalk = require(`chalk`);
const apiRoutes = require(`../../api`);
const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);
const express = require(`express`);

const {DEFAULT_PORT, API_PREFIX} = require(`../../constants`);
const app = express();

app.use(express.json());

app.use(API_PREFIX, apiRoutes);

app.use((req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json(getReasonPhrase(StatusCodes.NOT_FOUND));
});


module.exports = {
  name: `--server`,
  async run(arg) {
    const [userPort] = arg;

    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      console.log(`Сервер принимает подключения на ${chalk.blue(port)})`);
    });
  }
};
