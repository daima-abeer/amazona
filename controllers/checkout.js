const Checkout = require('../models/checkout');
const Cart = require("../models/cart");

class CheckoutController {
    constructor(db) {
        this.db = db;
        this.model = new Checkout(db);
        this.index = this.index.bind(this);
        this.addAddress = this.addAddress.bind(this);
        this.create = this.create.bind(this);
    }

    async index(req, res) {
        try {
            const cart = new Cart(this.db, req.session);

            if (cart.items.length === 0) {
                return res.redirect('/cart');
            }

            let items = await cart.all();
            const total = items[1];
            items = items[0];

            const addresses = await this.model.address.getAddressesByUserId(req.session.user.id);
            let billingAddress, shippingAddress;
            if (addresses) {
                billingAddress = addresses.filter(addr => addr.type === 'billing')[0];
                shippingAddress = addresses.filter(addr => addr.type === 'shipping')[0];
            }
            res.render('checkout', { items, total, billingAddress, shippingAddress });
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async addAddress(req, res) {
        console.log('adding address')
        try {
            const address = req.body;
            const result = await this.model.address.create(address);
            return res.json({'status': '200', 'id': result});
        } catch (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
    }

    async create(req, res) {
        try {
            const cart = new Cart(this.db, req.session);
            const orderId = await this.model.createOrder(req.session.user.id, cart);
            cart.clear();
            return res.render('thank-you');
        } catch (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = CheckoutController;