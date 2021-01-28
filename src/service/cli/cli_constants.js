"use strict";

const path = require(`path`);

exports.DEFAULT_COMMAND = `--help`;
exports.DEFAULT_COUNT_PUBLICATIONS = 1;
exports.FILE_NAME = `mocks.json`;
exports.COUNT_LAST_MONTH = 3;
exports.DEFAULT_PORT = 3000;

exports.USER_ARGV_INDEX = 2;
exports.EXIT_CODE = {
  error: 1,
  success: 0,
};

exports.PATH_TO_DATA = {
  TITLES: path.join(process.env.NODE_PATH, `data`, `titles.txt`),
  CATEGORIES: path.join(process.env.NODE_PATH, `data`, `categories.txt`),
  SENTENCES: path.join(process.env.NODE_PATH, `data`, `sentences.txt`)
};
