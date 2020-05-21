const express = require("express");
const nunjucks = require("nunjucks");
const methodOverride = require("method-override");
const session = require("./config/session");

const server = express();
const router = require("./routes");

server.set("view engine", "njk");

nunjucks.configure("src/app/view", {
  express: server,
  autoescape: true,
  noCache: true,
});

// ? caso queira usar essa mesma api, para outro endereço um ,  npm install cors , server.use(cors());

server.use(session);
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true })); // aqui ele recebe o começa receber formulários;
server.use(methodOverride("_method")); //extensão para conseguir usar PUT e DELETE;
server.use(router);

server.listen(3333, () => console.log("Server is Running"));
