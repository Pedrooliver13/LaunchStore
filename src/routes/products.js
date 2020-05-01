const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer');// responsável por dar um limite de fotos e enviar para pasta images;

const productsControllers = require('../app/controllers/produtcsControllers');
const ProcurarControllers = require('../app/controllers/searchControllers');


// Search
routes.get('/search', ProcurarControllers.index);

// Products
routes.get("/create", productsControllers.create);
routes.get("/:id", productsControllers.show);
routes.get("/:id/edit", productsControllers.edit);

routes.post("/create", multer.array("photos", 6),productsControllers.post);
routes.put("/", multer.array("photos", 6), productsControllers.put);
routes.delete("/", productsControllers.delete);

module.exports = routes;