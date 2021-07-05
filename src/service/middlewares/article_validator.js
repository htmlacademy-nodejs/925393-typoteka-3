"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {ARTICLE_KEYS} = require(`./middlewares_constants`);

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ARTICLE_KEYS.every((key) => keys.includes(key));

  if (!keysExists) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(`Bad request: В объекте запроса определены не все поля`);
  }

  next();
};
