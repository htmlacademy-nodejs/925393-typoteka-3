"use strict";

const {Router} = require(`express`);

const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => console.log(`/`));
mainRoutes.get(`/login`, (req, res) => console.log(`/login`));
mainRoutes.get(`/register`, (req, res) => console.log(`/register`));
mainRoutes.get(`/search`, (req, res) => console.log(`/search`));
mainRoutes.get(`/category`, (req, res) => console.log(`/category`));

module.exports = mainRoutes;
