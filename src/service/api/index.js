"use strict";

const Router = require(`express`);

const articlesRoutes = require(`./articles_routes`);
const categoriesRoutes = require(`./categories_routes`);
const searchRoutes = require(`./search_routes`);

const getMockData = require(`../lib/get_mock_data`);

const {
  ArticlesController,
  CategoriesController,
  CommentsController,
  SearchController
} = require(`../controllers`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  articlesRoutes(app, new ArticlesController(mockData), new CommentsController());
  categoriesRoutes(app, new CategoriesController(mockData));
  searchRoutes(app, new SearchController(mockData));
})();

module.exports = app;


