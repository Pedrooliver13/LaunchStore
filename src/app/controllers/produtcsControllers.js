const { formatBRL } = require("../../lib/utils");

const Category = require("../models/category");
const Products = require("../models/productsModels");
const File = require("../models/file");

module.exports = {
  create(req, res) {
    Category.all()
      .then(results => {
        const category = results.rows;

        return res.render("products/create", { category });
      })
      .catch(err => new Error(err));
  },
  async post(req, res) {
    //lógica de validação
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "") return res.send("Please , fill all fields");
    }

    let results = await Products.find(req.body);
    const productId = results.rows[0].id;

    if (req.files.length == 0) return res.send("please , send last one image");

    const filePromise = req.files.map(file =>
      File.create({
        ...file,
        product_id: productId
      })
    );

    await Promise.all(filePromise);
    await Products.create(req.body);

    return res.redirect("products/create");
  },
  async show(req, res){
    return res.render('products/show');
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

    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}` // enviando ao front-end
    }));

    return res.render("products/edit", { product, category, files });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "" && key != "removed_files") return res.send("Please ,  fill all fields");
    }

    if (req.body.old_price != req.body.price) {
      //se o preço atual for diferente do antigo
      const oldProduct = await Products.find(req.body.id);
      req.body.old_price = oldProduct.rows[0].price;
    }

    if (req.body.removed_files) {
      // removendo virgula
      const removedFiles = req.body.removed_files.split(","); // [1, 2, 3,]
      const lastIndex = removedFiles.length - 1;

      removedFiles.splice(lastIndex, 1);
      const removedFilesPromise = removedFiles.map(id => File.delete(id));

      await Promise.all(removedFilesPromise);
    }

    //caso queira adicionar mais imagens;
    if (req.files.length != 0) {
      const newFilesPromise = req.files.map(file => ({
        ...file,
        product_id: req.body.id
      }));

      await Promise.all(newFilesPromise);
    }

    await Products.update(req.body);
  },
  async delete(req, res) {
    await Products.delete(req.body.id);

    return res.redirect("products/create");
  }
};
