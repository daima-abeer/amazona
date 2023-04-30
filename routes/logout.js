const express = require('express');
const router = express.Router();
const LogoutController = require('../controllers/logout');
const Auth = require('../middleware/auth');

class LogoutRouter {
    constructor(db) {
        this.controller = new LogoutController(db);
        this.auth = new Auth();
        this.path = '/logout';
        this.router = router;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', (req, res) => {
            this.controller.logout(req, res);
        });
    }
}

module.exports = LogoutRouter;