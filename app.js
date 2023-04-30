const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const Database = require('./config/db');
const fs = require('fs');
const UserMiddleware = require('./middleware/user');

class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.db = new Database({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'estore'
        });
        this.routes = fs.readdirSync(__dirname + '/routes');
        this.setup();
    }
    setup() {
        this.setupViewEngine();
        this.setupMiddleware();
        this.setupRoutes();
    }
    setupViewEngine() {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
    }
    setupMiddleware() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(session({
            secret: 'estore',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(new UserMiddleware().check);
    }
    setupRoutes() {
        this.routes.forEach((file) => {
            if (file.endsWith('.js')) {
                const RouteClass = require(`./routes/${file}`);
                const route = new RouteClass(this.db);
                this.app.use(route.path, route.router);
            }
        });
        this.app.use((req, res, next) => {
            res.status(404);
            res.render('404');
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}

const server = new Server(process.env.PORT || 4000);
server.start();

