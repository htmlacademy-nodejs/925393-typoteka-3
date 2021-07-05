"use strict";

const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);

const sendResponseWithError = (res, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) => {
  res
    .status(statusCode)
    .json(getReasonPhrase(statusCode));
};

module.exports = {
  sendResponseWithError
};
