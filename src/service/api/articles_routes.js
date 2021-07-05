"use strict";

const Router = require(`express`);

const offersValidator = require(`src/service/middlewares/article_validator`);

const articleRouter = new Router();

module.exports = (app, controller) => {
  app.use(`/articles`, articleRouter);

  articleRouter.get(`/`, (req, res) => controller.getAll(req, res));
  articleRouter.get(`/:articleId`, (req, res) => controller.getOne(req, res));

  articleRouter.post(`/`, offersValidator, (req, res) => controller.create(req, res));
};


