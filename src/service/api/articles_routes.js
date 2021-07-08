"use strict";

const Router = require(`express`);

const articleValidator = require(`../middlewares/article_validator`);
const articleExist = require(`../middlewares/article_exist`);
const commentsValidator = require(`../middlewares/comments_validator`);

const articleRouter = new Router();

module.exports = function (app, mainController, ...args) {
  const [commentsController] = args;
  app.use(`/articles`, articleRouter);

  articleRouter.get(`/`, mainController.getAll);
  articleRouter.post(`/`, articleValidator, mainController.create);

  articleRouter.get(`/:articleId`, mainController.getOne);
  articleRouter.put(`/:articleId`, articleValidator, mainController.update);
  articleRouter.delete(`/:articleId`, mainController.drop);

  articleRouter.get(`/:articleId/comments`, articleExist(mainController), commentsController.getAll);
  articleRouter.post(`/:articleId/comments`, [articleExist(mainController), commentsValidator], commentsController.create);
  articleRouter.delete(`/:articleId/comments/:commentId`, articleExist(mainController), commentsController.drop);
};


