"use strict";

const {StatusCodes} = require(`http-status-codes`);

const {COMMENT_KEYS} = require(`./middlewares_constants`);
const {sendResponseWithError} = require(`../controllers/controllersUtils`);

module.exports = (req, res, next) => {
  try {
    const newComment = req.body;
    const keys = Object.keys(newComment);
    const keysExists = COMMENT_KEYS.every((key) => keys.includes(key));

    if (!keysExists) {
      return sendResponseWithError(res, StatusCodes.BAD_REQUEST, `В теле запроса определены не все поля!`);
    }

    next();
  } catch (e) {
    sendResponseWithError(res);
    next(e);
  }
  return null;
};
