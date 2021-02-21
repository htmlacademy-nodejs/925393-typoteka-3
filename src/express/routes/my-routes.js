"use strict";

const {Router} = require(`express`);

const myRoutes = new Router();

myRoutes.get(`/`, (req, res) => {
  res.render(`pages/my.hbs`, {
    layout: `blue-color-layout`
  });
});

myRoutes.get(`/comments`, (req, res) => {
  res.render(`pages/comments.hbs`, {
    layout: `blue-color-layout`
  });
});

module.exports = myRoutes;
