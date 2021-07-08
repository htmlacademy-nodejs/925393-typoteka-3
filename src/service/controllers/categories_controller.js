"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {sendResponseWithError} = require(`./controllersUtils`);

class CategoriesController {
  constructor(data) {
    this._data = data;
  }

  getAll(req, res) {
    try {
      const categories = this._data.reduce((acc, item) => {
        const category = item.category;
        acc.add(category);
        return acc;
      }, new Set());

      const arrayCategories = [...categories];

      res
        .status(StatusCodes.OK)
        .json(arrayCategories);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
  }
}

module.exports = CategoriesController;
