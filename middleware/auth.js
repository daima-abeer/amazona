class Auth {
    constructor() {
        this.check = this.check.bind(this);
    }
    async check(req, res, next) {
        if (req.session && req.session.loggedIn) {
            return res.redirect('/orders');
        }
        return next();
    }
}

module.exports = Auth;