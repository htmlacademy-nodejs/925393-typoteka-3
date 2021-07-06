"use strict";

const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);

module.exports = (controller) => (req, res, next) => {
  try {
    res.locals.isNotResponse = true;

    const article = controller.getOne(req, res);

    if (!article) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(getReasonPhrase(StatusCodes.NOT_FOUND));
    }
    res.locals.article = article;
    next();
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    console.error(e);
  }
};
