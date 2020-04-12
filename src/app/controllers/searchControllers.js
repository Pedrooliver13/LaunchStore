const { formatBRL } = require('../../lib/utils');

const Product = require("../models/productsModels");

module.exports = {
  async index(req, res) {
    try {
      let results = await Product.all();
      const products = results.rows;

      if(!products) return res.send('Products NOT found');

      async function getImage(productId){
        let results = await Product.files(productId); 
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`);

        return files[0];
      }
      
      const ProductsPromise = products.map(async product => {
        product.img = await getImage(product.id);
        product.oldPrice = formatBRL(product.old_price);
        product.price = formatBRL(product.price);

        return product;
      }).filter((product, index)=> index > 2 ? false : true); //lembrando que array conta de zero para frente , portanto o total é de três products que vai aparecer;

      const lastAdded = await Promise.all(ProductsPromise);

      return res.render("search/index", { products: lastAdded });

    } catch (err) {
      console.log(err)
    }
  },
};
