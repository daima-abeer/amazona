const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login');
const OrdersController = require('../controllers/orders');
const ProductsController = require('../controllers/products');
const LogoutController = require('../controllers/logout');
const Auth = require('../middleware/auth-admin');
const multer = require('multer');
const {extname} = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
    }
})
const upload = multer({ storage: storage });

class LoginRouter {
    constructor(db) {
        this.db = db;
        this.controller = new LoginController(db);
        this.logoutController = new LogoutController(db);
        this.ordersController = new OrdersController(db);
        this.productsController = new ProductsController(db);
        this.auth = new Auth();
        this.path = '/admin';
        this.router = router;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.auth.check, (req, res) => {
            this.controller.adminIndex(req, res);
        });

        this.router.post('/', (req, res) => {
            this.controller.adminLogin(req, res);
        });

        this.router.get('/logout', (req, res) => {
            this.logoutController.adminLogout(req, res);
        });

        this.router.get('/orders', this.auth.handle,(req, res) => {
            this.ordersController.adminOrders(req, res);
        });

        this.router.post('/orders/update', (req, res) => {
            this.ordersController.updateOrder(req, res);
        });
        this.router.get('/products', this.auth.handle, (req, res) => {
            this.productsController.adminProducts(req, res);
        });
        this.router.delete('/product/:id', (req, res) => {
            this.productsController.delete(req, res);
        });
        this.router.get('/product/add', this.auth.handle, (req, res) => {
            this.productsController.addProduct(req, res);
        });
        this.router.post('/product/add', upload.single('thumbnail'), (req, res) => {
            this.productsController.create(req, res);
        });
        this.router.get('/product/edit/:id', this.auth.handle, (req, res) => {
            this.productsController.edit(req, res);
        });
        this.router.post('/product/edit/:id', upload.single('thumbnail'), (req, res) => {
            this.productsController.update(req, res);
        });
    }
}

module.exports = LoginRouter;
