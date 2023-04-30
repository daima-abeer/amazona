const Orders = require('../models/orders');
const Address = require('../models/address');

class Checkout extends Orders{
    constructor(db) {
        super(db);
        this.address = new Address(db);
    }

}

module.exports = Checkout;