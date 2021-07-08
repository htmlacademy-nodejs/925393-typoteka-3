"use strict";

const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);

const sendResponseWithError = (res, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, customMessage = ``) => {
  const message = customMessage ? `: ${customMessage}` : customMessage;
  res
    .status(statusCode)
    .json(`${getReasonPhrase(statusCode)}${message}`);
};

module.exports = {
  sendResponseWithError
};
