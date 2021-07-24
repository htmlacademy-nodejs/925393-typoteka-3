"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {sendResponseWithError} = require(`../controllers/controllersUtils`);

module.exports = (req, res, next) => {
  try {
    const {article} = res.locals;
    const {commentId} = req.params;

    const foundComment = article.comments.find((comment) => comment.id === commentId);

    if (!foundComment) {
      sendResponseWithError(res, StatusCodes.NOT_FOUND);
    }
    res.locals.foundComment = foundComment;

    next();
  } catch (e) {
    sendResponseWithError(res);
    next(e);
  }
  return null;
};
