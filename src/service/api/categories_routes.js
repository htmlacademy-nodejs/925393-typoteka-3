"use strict";

const Router = require(`express`);

const categoryRouter = new Router();

module.exports = (app, controller) => {
  app.use(`/categories`, categoryRouter);

  categoryRouter.get(`/`, (req, res) => controller.getAll(req, res));
};
