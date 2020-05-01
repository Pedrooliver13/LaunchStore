const { formatBRL } = require("../../lib/utils");

const Product = require("../models/productsModels");

module.exports = {
  async index(req, res) {
    try {
      let results,
        params = {};

      const { filter, category } = req.query;

      if (!filter) return res.redirect("/");
      params.filter = filter;

      if (category) params.category = category;

      results = await Product.search(params);

    
      async function getImage(productId){
        let results = await Product.files(productId);
        let files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

        return files[0];
      }

      let productPromise = results.rows.map(async product => {
        product.img = await getImage(product.id);
        product.price = formatBRL(product.price);
        product.oldPrice = formatBRL(product.old_price);

        return product;
      })

      const products = await Promise.all(productPromise);

      const search = {
        term: req.query.filter, // esse vai pegar o que acabamos de pesquisar
        total: products.length
      };

      const categorys = products.map(product => ({
        id: product.category_id,
        name: product.category_name
        
      })).reduce((categoryFilter, category) => {
        const found = categoryFilter.some(cat => cat.id == category.id);

        if (!found)
          categoryFilter.push(category);

        return categoryFilter;
      }, []);

      return res.render('search/index', { products, search, categorys });

    } catch (error) {
      console.error(error);
    }
  },
};
