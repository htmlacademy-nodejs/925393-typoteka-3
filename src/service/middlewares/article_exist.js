"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {sendResponseWithError} = require(`../controllers/controllersUtils`);

module.exports = (controller) => (req, res, next) => {
  try {
    res.locals.isNotResponse = true;

    const article = controller.getOne(req, res);

    if (!article) {
      return sendResponseWithError(res, StatusCodes.NOT_FOUND, `статья с таким ID не найдена!`);
    }
    res.locals.article = article;
    next();
  } catch (e) {
    sendResponseWithError(res);
    next(e);
  }
  return null;
};
