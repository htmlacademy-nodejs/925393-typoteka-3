"use strict";

const path = require(`path`);
const fs = require(`fs`).promises;
const http = require(`http`);
const chalk = require(`chalk`);
const status = require(`http-status-codes`);

const {DEFAULT_PORT, FILE_NAME} = require(`../cli_constants`);

const sendResponse = (res, statusCode, content) => {
  const template = `
     <!Doctype html>
      <html lang="ru">
      <head>
        <title>Учебный проект по Node.js</title>
      </head>
      <body>${content}</body>
    </html>
  `;
  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`
  });
  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Page Not found`;

  switch (req.url) {
    case `/`:
      try {
        const pathToReadFile = path.join(process.env.NODE_PATH, `${FILE_NAME}`);
        const fileContent = await fs.readFile(pathToReadFile);
        const mocks = JSON.parse(fileContent);

        const content = mocks.map((item) => `<li>${item.title}</li>`).join(``);
        sendResponse(res, status.OK, `<ul>${content}</ul>`);
      } catch (err) {
        sendResponse(res, status.NOT_FOUND, notFoundMessageText);
      }
  }
};

module.exports = {
  name: `--server`,
  async run(arg) {
    const [userPort] = arg;

    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          console.error(`Ошибка при создании сервера`, err);
        } else {
          console.info(chalk.green(`Ожидаю соединений на ${port}`));
        }
      });
  }
};
