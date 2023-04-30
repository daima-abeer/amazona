const bcrypt = require('bcrypt');
const User = require('../models/user');

class RegisterController {
    constructor(db) {
        this.db = db;
        this.user = new User(db);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    async index(req, res) {
        res.render('register');
    }

    async create(req, res) {
        try {
            const details = req.body;
            let flag = false;
            let validNameClass = '';
            let validNameMessage = '';
            if (!details.name) {
                flag = true;
                validNameClass = 'is-invalid';
                validNameMessage = 'Name is required';
            }
            const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
            if (!nameRegex.test(details.name)) {
                flag = true;
                validNameClass = 'is-invalid';
                validNameMessage = 'Name is invalid';
            }
            if (details.name.length < 3) {
                flag = true;
                validNameClass = 'is-invalid';
                validNameMessage = 'Name is too short';
            }

            let validUsernameClass = '';
            let validUsernameMessage = '';
            if (!details.username) {
                flag = true;
                validUsernameClass = 'is-invalid';
                validUsernameMessage = 'Username is required';
            }
            let user = await this.user.findByUsername(details.username);
            if (user) {
                flag = true;
                validUsernameClass = 'is-invalid';
                validUsernameMessage = 'Username is already registered';
            }

            let validEmailClass = '';
            let validEmailMessage = '';
            if (!details.email) {
                flag = true;
                validEmailClass = 'is-invalid';
                validEmailMessage = 'Email is required';
            }
            user = await this.user.findByEmail(details.email);
            if (user) {
                flag = true;
                validEmailClass = 'is-invalid';
                validEmailMessage = 'Email is already registered';
            }

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!emailRegex.test(details.email)) {
                flag = true;
                validEmailClass = 'is-invalid';
                validEmailMessage = 'Email is invalid';
            }

            let validPasswordClass = '';
            let validPasswordMessage = '';
            if (!details.password) {
                flag = true;
                validPasswordClass = 'is-invalid';
                validPasswordMessage = 'Password is required';
            }
            if (details.password.length < 8) {
                flag = true;
                validPasswordClass = 'is-invalid';
                validPasswordMessage = 'Password is too short';
            }

            let validConfirmPasswordClass = '';
            let validConfirmPasswordMessage = '';
            if (details.password !== details.confirm_password) {
                flag = true;
                validConfirmPasswordClass = 'is-invalid';
                validConfirmPasswordMessage = 'Passwords do not match';
            }

            if (flag) {
                return res.render('register', {
                    validNameClass,
                    validNameMessage,
                    validUsernameClass,
                    validUsernameMessage,
                    validEmailClass,
                    validEmailMessage,
                    validPasswordClass,
                    validPasswordMessage,
                    validConfirmPasswordClass,
                    validConfirmPasswordMessage,
                    name: details.name,
                    username: details.username,
                    email: details.email
                });
            }
            await this.user.create({
                name: details.name,
                username: details.username,
                email: details.email,
                password: await bcrypt.hash(details.password, Math.floor(Math.random() * 6) + 10)
            });
            res.redirect('/login');
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = RegisterController;