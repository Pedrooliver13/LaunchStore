const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer');// responsável por dar um limite de fotos e enviar para pasta images;

const productsControllers = require('../app/controllers/produtcsControllers');
const ProcurarControllers = require('../app/controllers/searchControllers');

const { onlyUsers } = require('../app/middlewares/session'); // um middleware para bloqueio de rotas;

// Search
routes.get('/search', ProcurarControllers.index);

// Products
routes.get("/create", onlyUsers ,productsControllers.create);
routes.get("/:id", productsControllers.show);
routes.get("/:id/edit", onlyUsers ,productsControllers.edit);

routes.post("/create", onlyUsers ,multer.array("photos", 6),productsControllers.post);
routes.put("/", onlyUsers ,multer.array("photos", 6), productsControllers.put);
routes.delete("/", onlyUsers ,productsControllers.delete);

module.exports = routes;