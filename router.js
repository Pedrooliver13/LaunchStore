const express = require("express");
const routes = express.Router();
const multer = require("./src/app/middlewares/multer"); // responsável por dar um limite de fotos

const productsControllers = require("./src/app/controllers/produtcsControllers");

routes.get("/", (req, res) => {
  return res.render("layout");
});

routes.get("/products/create", productsControllers.create);
routes.get('/products/:id', productsControllers.show);
routes.get("/products/:id/edit", productsControllers.edit);

routes.post("/products/create", multer.array("photos", 6), productsControllers.post);
routes.put("/products", multer.array("photos", 6), productsControllers.put);

//álias
routes.get("ads/products/create");

module.exports = routes;
