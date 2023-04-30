const User = require('../models/user');
const bcrypt = require('bcrypt');

class LoginController {
    constructor(db) {
        this.db = db;
        this.user = new User(db);
        this.index = this.index.bind(this);
        this.login = this.login.bind(this);
        this.adminLogin = this.adminLogin.bind(this);
        this.adminIndex = this.adminIndex.bind(this);
    }

    async index(req, res) {
        res.render('login');
    }

    async login(req, res) {
        try {
            const details = req.body;
            let flag = false;
            let validEmailClass = '';
            let validEmailMessage = '';
            if (!details.email) {
                flag = true;
                validEmailClass = 'is-invalid';
                validEmailMessage = 'Email is required';
            }
            let user = await this.user.findByEmail(details.email);
            if (!user) {
                flag = true;
                validEmailClass = 'is-invalid';
                validEmailMessage = 'Email is not registered';
            }
            let validPasswordClass = '';
            let validPasswordMessage = '';
            if (!details.password) {
                flag = true;
                validPasswordClass = 'is-invalid';
                validPasswordMessage = 'Password is required';
            }
            if (!flag) {
                const match = await bcrypt.compare(details.password, user.password);
                if (!match) {
                    flag = true;
                    validPasswordClass = 'is-invalid';
                    validPasswordMessage = 'Password is incorrect';
                }
            }
            if (flag) {
                return res.render('login', {
                    validEmailClass,
                    validEmailMessage,
                    validPasswordClass,
                    validPasswordMessage,
                    email: details.email
                });
            }
            req.session.loggedIn = true;
            req.session.user = user;
            res.redirect('/orders');
        } catch(err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        }
    }

    async adminLogin(req, res) {
        try {
            const details = req.body;
            let flag = false;
            let validUsernameClass = '';
            let validUsernameMessage = '';
            if (!details.username) {
                flag = true;
                validUsernameClass = 'is-invalid';
                validUsernameMessage = 'Username is required';
            }
            let user;
            if (details.username === 'admin') {
                user = {
                    username: 'admin',
                    password: '12345678'
                };
            }
            if (!user) {
                flag = true;
                validUsernameClass = 'is-invalid';
                validUsernameMessage = 'Username not found';
            }
            let validPasswordClass = '';
            let validPasswordMessage = '';
            if (!details.password) {
                flag = true;
                validPasswordClass = 'is-invalid';
                validPasswordMessage = 'Password is required';
            }
            if (!flag) {
                if (details.password !== user.password) {
                    flag = true;
                    validPasswordClass = 'is-invalid';
                    validPasswordMessage = 'Password is incorrect';
                }
            }
            if (flag) {
                return res.render('admin/login', {
                    validUsernameClass,
                    validUsernameMessage,
                    validPasswordClass,
                    validPasswordMessage,
                    username: details.username
                });
            }
            req.session.adminLoggedIn = true;
            req.session.adminUser = user;
            res.redirect('/admin/products');
        } catch(err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        }
    }
    async adminIndex(req, res) {
        res.render('admin/login');
    }
}

module.exports = LoginController;