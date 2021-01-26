"use strict";

const path = require(`path`);

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.DEFAULT_COUNT_PUBLICATIONS = 1;
module.exports.FILE_NAME = `mocks.json`;
module.exports.COUNT_LAST_MONTH = 3;

module.exports.USER_ARGV_INDEX = 2;
module.exports.EXIT_CODE = {
  error: 1,
  success: 0,
};

module.exports.PATH_TO_DATA = {
  TITLES: path.join(process.env.NODE_PATH, `data`, `titles.txt`),
  CATEGORIES: path.join(process.env.NODE_PATH, `data`, `categories.txt`),
  SENTENCES: path.join(process.env.NODE_PATH, `data`, `sentences.txt`)
};
