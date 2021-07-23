"use strict";

const Router = require(`express`);

const articleRoutes = new Router();

articleRoutes.get(`/add`, (req, res) => {
  res.render(`pages/new-post.hbs`);
});
articleRoutes.get(`/edit/:id`, (req, res) => console.log(`/articles/edit/:id`));

articleRoutes.get(`/category/:id`, (req, res) => {
  res.render(`pages/articles-by-category.hbs`);
});

articleRoutes.get(`/:id`, (req, res) => {
  res.render(`pages/post.hbs`);
});

module.exports = articleRoutes;
