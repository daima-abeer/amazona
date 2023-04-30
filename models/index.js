class Model {
    constructor(db, table) {
        this.db = db
        this.table = table;
    }

    async all() {
        const sql = `SELECT * FROM ${this.table}`;
        return await this.db.query(sql);
    }

    async findById(id) {
        const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
        const results = await this.db.query(sql, [id]);
        return results[0];
    }

    async findByAllIds(ids) {
        const sql = `SELECT * FROM ${this.table} WHERE id IN (?)`;
        return await this.db.query(sql, [ids]);
    }

    async create(data) {
        const sql = `INSERT INTO ${this.table} SET ?`;
        const result = await this.db.query(sql, data);
        return result.insertId;
    }

    async createMany(data) {
        const sql = `INSERT INTO ${this.table} (${Object.keys(data[0]).join(',')}) VALUES ?`;
        const result = await this.db.query(sql, [data.map((item) => Object.values(item))]);
        return result.insertId;
    }

    async update(id, data) {
        const sql = `UPDATE ${this.table} SET ? WHERE id = ?`;
        const result = await this.db.query(sql, [data, id]);
        return result.affectedRows;
    }

    async delete(id) {
        const sql = `DELETE FROM ${this.table} WHERE id = ?`;
        const result = await this.db.query(sql, [id]);
        return result.affectedRows;
    }

    async find(options, args=[]) {
        const {
            where = '',
            fields = '*',
            groupBy = '',
            orderBy = '',
            limit = '',
            aggregation = ''
        } = options;

        let sql = `SELECT ${fields}`;

        if (aggregation) {
            sql += `, ${aggregation}`;
        }

        sql += ` FROM ${this.table}`;

        if (where) {
            sql += ` WHERE ${where}`;
        }

        if (groupBy) {
            sql += ` GROUP BY ${groupBy}`;
        }

        if (orderBy) {
            sql += ` ORDER BY ${orderBy}`;
        }

        if (limit) {
            sql += ` LIMIT ${limit}`;
        }

        return await this.db.query(sql, args);
    }

    async join(options, args=[]) {
        const {
            table2,
            on,
            where = '',
            fields = '*',
            groupBy = '',
            orderBy = '',
            limit = '',
            aggregation = ''
        } = options;

        let sql = `SELECT ${fields}`;

        if (aggregation) {
            sql += `, ${aggregation}`;
        }

        sql += ` FROM ${this.table}
           JOIN ${table2}
           ON ${on}`;

        if (where) {
            sql += ` WHERE ${where}`;
        }

        if (groupBy) {
            sql += ` GROUP BY ${groupBy}`;
        }

        if (orderBy) {
            sql += ` ORDER BY ${orderBy}`;
        }

        if (limit) {
            sql += ` LIMIT ${limit}`;
        }

        return await this.db.query(sql, args);
    }






}

module.exports = Model;
