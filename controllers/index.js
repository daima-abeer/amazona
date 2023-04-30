const Products = require('../models/products');

class IndexController {
    constructor(db) {
        this.db = db;
        this.products = new Products(db);
        this.index = this.index.bind(this);
    }

    async index(req, res) {
        try {
            const products = await this.products.all();
            res.render('index', {products});
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = IndexController;