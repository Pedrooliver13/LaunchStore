const { formatBRL, date } = require('../../lib/utils');

const Product = require('../models/productsModels');
const Category = require('../models/category');
const File = require('../models/file');

module.exports = {
  async index(req, res){
    let results = await Product.find(req.params.id);
    const product = results.rows;

    if(!product) return res.send('Product not found');
  }
}