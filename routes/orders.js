const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders');
const AuthOrder = require('../middleware/auth-order');

class OrdersRouter {
    constructor(db) {
        this.db = db;
        this.path = '/orders';
        this.router = router;
        this.controller = new OrdersController(this.db);
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
    }
}

module.exports = OrdersRouter;