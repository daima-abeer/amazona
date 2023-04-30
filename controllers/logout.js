class LogoutController {
    constructor(args) {
        this.logout = this.logout.bind(this);
        this.adminLogout = this.adminLogout.bind(this);
    }
    logout(req, res) {
        req.session.loggedIn = false;
        req.session.user = null;
        res.redirect('/login');
    }

    adminLogout(req, res) {
        req.session.adminLoggedIn = false;
        req.session.adminUser = null;
        res.redirect('/admin');
    }
}

module.exports = LogoutController;
