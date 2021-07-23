"use strict";

const Router = require(`express`);

const articleValidator = require(`../middlewares/article_validator`);
const articleExist = require(`../middlewares/article_exist`);
const commentExist = require(`../middlewares/comment_exists`);
const commentsValidator = require(`../middlewares/comments_validator`);


module.exports = function (app, mainController, ...args) {
  const articleRouter = new Router();

  const [commentsController] = args;
  app.use(`/articles`, articleRouter);

  articleRouter.get(`/`, mainController.getAll);
  articleRouter.post(`/`, articleValidator, mainController.create);

  articleRouter.get(`/:articleId`, mainController.getOne);
  articleRouter.put(`/:articleId`, [articleExist(mainController), articleValidator], mainController.update);
  articleRouter.delete(`/:articleId`, articleExist(mainController), mainController.drop);

  articleRouter.get(`/:articleId/comments`, articleExist(mainController), commentsController.getAll);
  articleRouter.post(`/:articleId/comments`, [articleExist(mainController), commentsValidator], commentsController.create);
  articleRouter.delete(`/:articleId/comments/:commentId`, [articleExist(mainController), commentExist], commentsController.drop);
};


