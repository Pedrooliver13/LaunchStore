const { formatBRL, date } = require("../../lib/utils");

const Category = require("../models/category");
const Products = require("../models/productsModels");
const File = require("../models/file");

module.exports = {
  create(req, res) {
    Category.all()
      .then((results) => {
        const category = results.rows;

        return res.render("products/create", { category });
      })
      .catch((err) => new Error(err));
  },
  async post(req, res) {
    //lógica de validação
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please,fill all fields");
    }

    if (req.files.length == 0) return res.send("Please, last one image");

    let results = await Products.create({
      ...req.body,
      user_id: req.session.userId
    }); // cria antes , para depois pegar o id;

    const productId = results.rows[0].id;

    //enviado para o banco de dados;
    const filePromises = req.files.map((file) =>
      File.create({
        ...file,
        product_id: productId,
      })
    );

    await Promise.all(filePromises); // para conseguir salvar , o array de imagens e tbm o map me retorna uma promise;(contem muitas imagens, por isso mandamos ele esperar usando as promesas);

    return res.redirect("/");
  },
  async show(req, res) {
    let results = await Products.find(req.params.id);
    const product = results.rows[0];

    if (!product) return res.send("Product is not found");

    const { day, month, hour, minutes } = date(product.updated_at);

    product.published = {
      date: `${day}/${month}`,
      hour: `${hour}h${minutes}`,
    };

    product.price = formatBRL(product.price);
    product.oldPrice = formatBRL(product.old_price); // chamamos ele de oldPrice

    //getImages
    results = await Products.files(product.id);
    const files = results.rows.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("products/show", { product, files });
  },
  async edit(req, res) {
    let results = await Products.find(req.params.id);
    let product = results.rows[0];

    if (!product) return res.send("Product is not found!");

    product.old_price = formatBRL(product.old_price);
    product.price = formatBRL(product.price);

    //getCategory
    results = await Category.all();
    const category = results.rows;

    //getImages
    results = await Products.files(product.id);

    let files = results.rows;

    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`, // enviando ao front-end
    }));

    return res.render("products/edit", { product, category, files });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "" && key != "removed_files")
        return res.send("Please ,  fill all fields");
    }

    if (req.body.old_price != req.body.price) {
      //se o preço atual for diferente do antigo
      const oldProduct = await Products.find(req.body.id);
      req.body.old_price = oldProduct.rows[0].price;
    }

    // removendo virgula para deletar apenas o id
    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(","); // [1, 2, 3,]
      const lastIndex = removedFiles.length - 1;

      removedFiles.splice(lastIndex, 1);
      const removedFilesPromise = removedFiles.map((id) => File.delete(id));

      await Promise.all(removedFilesPromise);
    }

    //caso queira adicionar mais imagens;
    if (req.files.length != 0) {
      const newFilesPromise = req.files.map((file) =>
        File.create({
          ...file,
          product_id: req.body.id,
        })
      );

      await Promise.all(newFilesPromise);
    }

    await Products.update(req.body);

    return res.redirect(`/products/${req.body.id}`);
  },
  async delete(req, res) {
    await Products.delete(req.body.id);

    return res.redirect("products/create");
  },
};
