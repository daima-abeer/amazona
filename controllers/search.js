const Search = require('../models/search');

class SearchController {
    constructor(db) {
        this.db = db;
        this.model = new Search(this.db);
        this.index = this.index.bind(this);
    }

    async index(req, res) {
        const keyword = req.query.q ?? '';
        const minPrice = req.query.minPrice ?? '';
        const maxPrice = req.query.maxPrice ?? '';
        const sort = req.query.sort ?? '';
        const products = await this.model.search(keyword, minPrice, maxPrice, sort);
        res.render('search', {keyword, minPrice, maxPrice, sort, products});
    }
}

module.exports = SearchController;