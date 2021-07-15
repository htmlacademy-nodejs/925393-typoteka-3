"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {sendResponseWithError} = require(`./controllersUtils`);

class SearchService {
  constructor(data) {
    this._data = data;
    this.search = this.search.bind(this);
  }

  search(req, res) {
    const resultArray = [];
    try {
      const articles = this._data;

      const {query = ``} = req.query;
      if (!query) {
        return sendResponseWithError(res, StatusCodes.BAD_REQUEST);
      }

      articles.forEach((article) => {
        const title = article.title.toLowerCase();

        if (title.indexOf(query.toLowerCase()) >= 0) {
          resultArray.push(article);
        }
      });
      if (resultArray.length === 0) {
        return sendResponseWithError(res, StatusCodes.NOT_FOUND, `По такому поисковому запросу ничего не найдено`);
      }
      res
        .status(StatusCodes.OK)
        .json(resultArray);
    } catch (e) {
      sendResponseWithError(res);
      console.error(e);
    }
    return resultArray;
  }

}

module.exports = SearchService;
