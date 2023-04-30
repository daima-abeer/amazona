const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index');

class IndexRouter {
    constructor(db) {
        this.db = db;
        this.path = '/';
        this.router = router;
        this.controller = new IndexController(this.db);
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', (req, res) => {
            this.controller.index(req, res);
        });
    }
}

module.exports = IndexRouter;
