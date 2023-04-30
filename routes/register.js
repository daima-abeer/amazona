const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/register');
const Auth = require('../middleware/auth');

class RegisterRouter {
    constructor(db) {
        this.db = db;
        this.controller = new RegisterController(db);
        this.auth = new Auth();
        this.path = '/register';
        this.router = router;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.auth.check, (req, res, next) => {
            this.controller.index(req, res);
        });

        this.router.post('/', (req, res, next) => {
            this.controller.create(req, res);
        });
    }
}

module.exports = RegisterRouter;
