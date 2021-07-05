"use strict";

const {nanoid} = require(`nanoid`);
const {StatusCodes} = require(`http-status-codes`);
const {sendResponseWithError} = require(`./controllersUtils`);

const {MAX_ID_LENGTH} = require(`../constants`);

class ArticlesController {
  constructor(data) {
    this._data = data;
  }

  getAll(req, res) {
    res
      .status(StatusCodes.OK)
      .json(this._data);
  }

  getOne(req, res) {
    try {
      const {articleId} = req.params;
      const article = this._data.find((item) => item.id === articleId);
      if (!article) {
        sendResponseWithError(res, StatusCodes.NOT_FOUND);
      }
      res
        .status(StatusCodes.OK)
        .json(article);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }

  create(req, res) {
    try {
      const newData = Object.assign({
        id: nanoid(MAX_ID_LENGTH),
      }, req.body, {
        comments: []
      });

      res
        .status(StatusCodes.CREATED)
        .json(newData);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }
}

module.exports = ArticlesController;
