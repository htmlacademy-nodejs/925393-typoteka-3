"use strict";

const Router = require(`express`);

const articlesRoutes = require(`./articles_routes`);
const categoriesRoutes = require(`./categories_routes`);

const getMockData = require(`../lib/get_mock_data`);

const {
  ArticlesController,
  CategoriesController
} = require(`../controllers`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  articlesRoutes(app, new ArticlesController(mockData));
  categoriesRoutes(app, new CategoriesController(mockData));
})();

module.exports = app;


