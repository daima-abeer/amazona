class Auth {
    constructor() {
        this.check = this.check.bind(this);
        this.handle = this.handle.bind(this);
    }
    async check(req, res, next) {
        if (req.session && req.session.adminLoggedIn) {
            return res.redirect('/admin/products');
        }
        return next();
    }

    async handle(req, res, next) {
        if (req.session && req.session.adminLoggedIn) {
            return next();
        }
        return res.redirect('/admin');
    }
}

module.exports = Auth;