const Products = require('./products');

class Search extends Products {
    constructor(db) {
        super(db);
    }

    async search(keyword, minPrice='', maxPrice='', sort='') {
        let sql = `SELECT * FROM ${this.table} WHERE name LIKE ?`;
        const values = [`%${keyword}%`];

        if (minPrice && maxPrice) {
            sql += ` AND price BETWEEN ? AND ?`;
            values.push(minPrice, maxPrice);
        }
        let order = 'ASC';
        if (['id', 'price-desc'].includes(sort)) {
            order = 'DESC';
        }
        const Sort = (sort === 'price-desc') ? 'price' : sort;

        if (sort && ['id', 'price'].includes(sort)) {
            sql += ` ORDER BY ${Sort} ${order}`;
        }

        return await this.db.query(sql, values);
    }
}

module.exports = Search;