"use strict";

const {Router} = require(`express`);

const articleRoutes = new Router();

articleRoutes.get(`/add`, (req, res) => console.log(`/article/add`));
articleRoutes.get(`/edit/:id`, (req, res) => console.log(`/articles/edit/:id`));
articleRoutes.get(`/category/:id`, (req, res) => console.log(`/articles/category/:id`));
articleRoutes.get(`/:id`, (req, res) => console.log(`/articles/:id`));

module.exports = articleRoutes;
