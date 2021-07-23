"use strict";

const {nanoid} = require(`nanoid`);
const {StatusCodes} = require(`http-status-codes`);
const {sendResponseWithError} = require(`./controllersUtils`);

const {MAX_ID_LENGTH} = require(`../constants`);

class CommentsController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.drop = this.drop.bind(this);
    this.create = this.create.bind(this);
  }

  getAll(req, res) {
    try {
      const {article} = res.locals;
      res
        .status(StatusCodes.OK)
        .json(article.comments);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }

  create(req, res) {
    try {
      const {article} = res.locals;
      const newComment = Object.assign({
        id: nanoid(MAX_ID_LENGTH),
      }, req.body);
      article.comments.push(newComment);
      res
        .status(StatusCodes.CREATED)
        .json(newComment);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }

  drop(req, res) {
    try {
      const {article} = res.locals;
      const {foundComment} = res.locals;

      const indexComment = article.comments.indexOf(foundComment);
      const deletedComment = article.comments.splice(indexComment, 1);
      res
        .status(StatusCodes.OK)
        .json(deletedComment);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }
}

module.exports = CommentsController;
