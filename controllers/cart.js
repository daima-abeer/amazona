const Cart = require('../models/cart');

class CartController {
    constructor(db) {
        this.db = db;
        this.index = this.index.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }
    async index(req, res) {
        try {
            const cart = new Cart(this.db, req.session);
            if (cart.items.length === 0) {
                return res.render('empty-cart');
            }
            let items = await cart.all();
            const total = items[1];
            items = items[0];
            res.render('cart', {items, total});
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        }
    }
    async addItem(req, res) {
        try {
            const productId = req.body.productId;
            const cart = new Cart(this.db, req.session);
            if (!productId) {
                return res.status(400).json({ error: 'Missing productId' });
            }
            cart.addItem(productId);
            res.json({status: true, productId: productId})
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        }
    }
    async removeItem(req, res) {
        try {
            const productId = req.body.productId;
            const cart = new Cart(this.db, req.session);
            if (!productId) {
                return res.status(400).json({ error: 'Missing productId' });
            }
            cart.removeItem(productId);
            res.json({status: true, productId: productId})
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        }
    }
    async updateItem(req, res) {
        try {
            const productId = req.body.productId;
            const quantity = req.body.quantity;
            const cart = new Cart(this.db, req.session);
            if (!productId) {
                return res.status(400).json({ error: 'Missing productId' });
            }
            cart.updateItem(productId, quantity);
            res.json({status: true, productId: productId})
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = CartController;