const Model = require('../models/index');

class User extends Model {
    constructor(db) {
        super(db, 'users');
    }

    async findByUsername(username) {
        const sql = `SELECT * FROM ${this.table} WHERE username = ?`;
        const results = await this.db.query(sql, [username]);
        if (results.length) {
            return results[0];
        }
        return null;
    }

    async findByEmail(email) {
        const sql = `SELECT * FROM ${this.table} WHERE email = ?`;
        const results = await this.db.query(sql, [email]);
        if (results.length) {
            return results[0];
        }
        return null;
    }
}

module.exports = User;