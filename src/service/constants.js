"use strict";

const path = require(`path`);

exports.DEFAULT_COMMAND = `--help`;
exports.DEFAULT_COUNT_PUBLICATIONS = 1;
exports.FILE_NAME = `mocks.json`;
exports.COUNT_LAST_MONTH = 3;
exports.DEFAULT_PORT = 3000;
exports.MAX_ID_LENGTH = 6;
exports.MAX_COMMENTS = 4;
exports.API_PREFIX = `/api`;

exports.USER_ARGV_INDEX = 2;
exports.EXIT_CODE = {
  error: 1,
  success: 0,
};

exports.ENV = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

exports.PATH_TO_DATA = {
  TITLES: path.join(`data`, `titles.txt`),
  CATEGORIES: path.join(`data`, `categories.txt`),
  SENTENCES: path.join(`data`, `sentences.txt`),
  COMMENTS: path.join(`data`, `comments.txt`)
};
