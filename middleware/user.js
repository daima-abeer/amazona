class User {
    constructor() {
        this.check = this.check.bind(this);
    }

    async check(req, res, next) {
        if (req.session && req.session.loggedIn) {
            res.locals.loggedIn = true;
            res.locals.user = req.session.user;
        } else {
            res.locals.loggedIn = false;
        }

        if (req.session && req.session.adminLoggedIn) {
            res.locals.adminLoggedIn = true;
            res.locals.adminUser = req.session.adminUser;
        } else {
            res.locals.adminLoggedIn = false;
        }
        return next();
    }
}

module.exports = User;