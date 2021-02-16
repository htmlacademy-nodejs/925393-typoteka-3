"use strict";

const express = require(`express`);
const routes = require(`./routes/index`);
const expressHandlebars = require(`express-handlebars`);
const path = require(`path`);
const {StatusCodes} = require(`http-status-codes`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = path.resolve(__dirname, `public`);

// config handlebars engine
const ENGINE_CONFIG = {
  layoutsDir: `templates/layouts`,
  defaultLayout: `default-layout`,
  extname: `.hbs`,
};

const app = express();

// middleware
app.use(express.static(PUBLIC_DIR));

app.engine(`hbs`, expressHandlebars(ENGINE_CONFIG));
app.set(`views`, `templates`);

app.use(`/`, routes.mainRoutes);
app.use(`/my`, routes.myRoutes);
app.use(`/article`, routes.articleRoutes);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).render(`pages/404.hbs`, {
    layout: `blue-color-layout`,
    codeError: StatusCodes.NOT_FOUND
  });
});

app.use((err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).render(`pages/500.hbs`, {
    layout: `blue-color-layout`,
    codeError: StatusCodes.INTERNAL_SERVER_ERROR
  });
});

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
