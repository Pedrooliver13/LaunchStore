const express = require("express");
const routes = express.Router();

const users = require('./users');
const products = require('./products');

const homeControllers = require("../app/controllers/homeControllers");

routes.get("/", homeControllers.index);
routes.use('/products', products);
routes.use('/user', users);

// Alias
routes.get("/ads/create", (req, res)=> res.redirect('/products/create'));


module.exports = routes;
