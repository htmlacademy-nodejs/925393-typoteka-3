"use strict";

const {nanoid} = require(`nanoid`);
const {StatusCodes} = require(`http-status-codes`);
const {sendResponseWithError} = require(`./controllersUtils`);

const {MAX_ID_LENGTH} = require(`../constants`);

class ArticlesController {
  constructor(data) {
    this._data = data;
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.drop = this.drop.bind(this);
  }

  getAll(req, res) {
    try {
      res
        .status(StatusCodes.OK)
        .json(this._data);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }

  getOne(req, res) {
    let article;
    try {
      const {articleId} = req.params;
      const {isNotResponse} = res.locals;
      article = this._data.find((item) => item.id === articleId);

      if (!article) {
        return sendResponseWithError(res, StatusCodes.NOT_FOUND);
      }
      if (!isNotResponse) {
        res
          .status(StatusCodes.OK)
          .json(article);
      }
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
    return article;
  }

  create(req, res) {
    try {
      const newData = Object.assign({
        id: nanoid(MAX_ID_LENGTH),
      }, req.body, {
        comments: [],
      });
      this._data.push(newData);

      res
        .status(StatusCodes.CREATED)
        .json(newData);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }

  update(req, res) {
    try {
      const {articleId} = req.params;
      const oldArticle = this._data.find((item) => item.id === articleId);

      const updatedArticle = Object.assign(oldArticle, req.body);
      res
        .status(StatusCodes.OK)
        .json(updatedArticle);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }

  drop(req, res) {
    try {
      const {articleId} = req.params;
      const article = this._data.find((item) => item.id === articleId);

      this._data = this._data.filter((item) => item.id !== articleId);
      res
        .status(StatusCodes.OK)
        .json(article);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
    return null;
  }
}

module.exports = ArticlesController;
