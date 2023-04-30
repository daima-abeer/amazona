const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login');
const Auth = require('../middleware/auth');

class LoginRouter {
    constructor(db) {
        this.db = db;
        this.controller = new LoginController(db);
        this.auth = new Auth();
        this.path = '/login';
        this.router = router;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.auth.check, (req, res) => {
            this.controller.index(req, res);
        });

        this.router.post('/', (req, res) => {
            this.controller.login(req, res);
        });
    }
}

module.exports = LoginRouter;
