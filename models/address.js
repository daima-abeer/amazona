const Model = require('./index');

class Address extends Model {
    constructor(db) {
        super(db, 'addresses');
    }

    async getAddressesByUserId(userId) {
        return await this.find({
            where: 'customer_id = ?'
        }, [userId]);
    }

    async getAdressByUserId(UserId, type) {
        return await this.find({
            where: 'customer_id = ? AND type = ?'
        }, [UserId, type]);
    }
}

module.exports = Address;