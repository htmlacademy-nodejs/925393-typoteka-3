"use strict";

const express = require(`express`);
const routes = require(`./routes/index`);

const DEFAULT_PORT = 8080;
const app = express();

app.use(`/`, routes.mainRoutes);
app.use(`/my`, routes.myRoutes);
app.use(`/article`, routes.articleRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
