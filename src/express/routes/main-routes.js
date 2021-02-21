"use strict";

const {Router} = require(`express`);
const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => {
  res.render(`pages/main.hbs`);
});

mainRoutes.get(`/login`, (req, res) => {
  res.render(`pages/sign-up.hbs`);

});
mainRoutes.get(`/register`, (req, res) => {
  res.render(`pages/registration.hbs`);

});
mainRoutes.get(`/search`, (req, res) => {
  res.render(`pages/search.hbs`, {
    layout: `blue-color-layout`
  });
});

mainRoutes.get(`/category`, (req, res) => {
  res.render(`pages/all-categories.hbs`, {
    layout: `blue-color-layout`
  });
});

module.exports = mainRoutes;
