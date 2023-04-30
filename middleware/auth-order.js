class AuthOrder {
    constructor() {
        this.handle = this.handle.bind(this);
    }
    handle(req, res, next) {
        if (req.session && req.session.loggedIn) {
            next()
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = AuthOrder;