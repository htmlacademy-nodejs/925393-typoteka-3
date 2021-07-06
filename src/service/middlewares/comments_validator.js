"use strict";

const {StatusCodes} = require(`http-status-codes`);

const {COMMENT_KEYS} = require(`./middlewares_constants`);

module.exports = (req, res, next) => {
  const newComment = req.body;
  const keys = Object.keys(newComment);
  const keysExists = COMMENT_KEYS.every((key) => keys.includes(key));

  if (!keysExists) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(`Bad request: в объекте запроса определены не все поля`);
  }

  next();
};
