const { formatBRL } = require("../../lib/utils");

const Product = require("../models/productsModels");

module.exports = {
  async index(req, res) {
    try {

      let results = await Product.all();
      const products = results.rows;

      async function getImage(productId) {
        // vamos pegar uma imagem por produto;
        let results = await Product.files(productId);
        const files = results.rows.map((file) =>
        `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`);

        return files[0];
      }

      let productPromise = products.map(async product => {
        product.img =  await getImage(product.id);
        product.price = formatBRL(product.price);
        product.oldPrice = formatBRL(product.old_price);

        return product;
      }).filter((product, index) => index > 2 ? false : true );
      
      let lastAdded = await Promise.all(productPromise);

      return res.render("home/index", { products: lastAdded });

    } catch (error) {
      console.error(error);
    }
  },
};
