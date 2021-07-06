"use strict";

const Router = require(`express`);

const searchRoutes = new Router();

module.exports = (app, mainController) => {
  app.use(`/search`, searchRoutes);

  searchRoutes.get(`/`, mainController.search);
};
