const express = require('express');
const router = express.Router();
const Checkout = require('../controllers/checkout');
const AuthOrder = require('../middleware/auth-order');

class CheckoutRouter {
    constructor(db) {
        this.db = db;
        this.path = '/checkout';
        this.router = router;
        this.controller = new Checkout(this.db);
        this.auth = new AuthOrder();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.auth.handle, (req, res) => {
            this.controller.index(req, res);
        });

        this.router.post('/', (req, res) => {
            this.controller.create(req, res);
        });

        this.router.post('/add-address', (req, res) => {
            this.controller.addAddress(req, res);
        })
    }
}

module.exports = CheckoutRouter;
