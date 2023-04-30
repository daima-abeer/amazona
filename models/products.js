const Model = require('../models/index');

class Products extends Model {
    constructor(db) {
        super(db, 'products');
    }

    async paginate(limit, offset) {
        const sql = `SELECT * FROM ${this.table} LIMIT ? OFFSET ?`;
        return await this.db.query(sql, [limit, offset]);
    }

    async count() {
        const sql = `SELECT COUNT(*) AS total FROM ${this.table}`;
        const results = await this.db.query(sql);
        return results[0].total;
    }

    async countSearch(keyword) {
        const sql = `SELECT COUNT(*) AS total FROM ${this.table} WHERE name LIKE ?`;
        const results = await this.db.query(sql, [`%${keyword}%`]);
        return results[0].total;
    }
}

module.exports = Products;