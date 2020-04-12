const express = require("express");
const routes = express.Router();
const multer = require("./src/app/middlewares/multer"); // responsável por dar um limite de fotos e enviar para pasta images;

const homeControllers = require("./src/app/controllers/homeControllers");
const productsControllers = require("./src/app/controllers/produtcsControllers");
const ProcurarControllers = require('./src/app/controllers/searchControllers');

// Home
routes.get("/", homeControllers.index);

// Search
routes.get('/products/search', ProcurarControllers.index);

// Products
routes.get("/products/create", productsControllers.create);
routes.get("/products/:id", productsControllers.show);
routes.get("/products/:id/edit", productsControllers.edit);

routes.post("/products/create", multer.array("photos", 6),productsControllers.post);
routes.put("/products", multer.array("photos", 6), productsControllers.put);

// Alias
routes.get("/ads/create", (req,res)=> {
  return res.send('Hello World!');
});



module.exports = routes;
