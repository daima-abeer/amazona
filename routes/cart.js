const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');

class CartRouter {
    constructor(db) {
        this.db = db;
        this.path = '/cart';
        this.router = router;
        this.controller = new CartController(this.db);
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', (req, res) => {
            this.controller.index(req, res);
        });

        this.router.post('/add', (req, res) => {
            this.controller.addItem(req, res);
        });

        this.router.post('/remove', (req, res) => {
            this.controller.removeItem(req, res)
        });

        this.router.post('/update', (req, res) => {
            this.controller.updateItem(req, res);
        });
    }
}

module.exports = CartRouter;
