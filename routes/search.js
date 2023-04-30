const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search');

class SearchRouter {
    constructor(db) {
        this.db = db;
        this.path = '/search';
        this.router = router;
        this.controller = new SearchController(this.db);
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', (req, res) => {
            this.controller.index(req, res);
        });
    }
}

module.exports = SearchRouter;
