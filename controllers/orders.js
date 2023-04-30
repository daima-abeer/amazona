const Orders = require('../models/orders');
const Cart = require('../models/cart');

class OrdersController {
    constructor(db) {
        this.db = db;
        this.model = new Orders(db);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    async index(req, res) {
        const orders = await this.model.getOrdersWithDetailsOfUser(req.session.user.id);
        res.render('orders', { orders });
    }

    async create(req, res) {
        const cart = new Cart(this.db, req.session);
        const orderId = await this.model.createOrder(req.session.user.id, cart);
        req.session.cart = null;
    }

    async adminOrders(req, res) {
        const orders = await this.model.getAllOrdersWithDetails();
        res.render('admin/orders', { orders });
    }

    async updateOrder(req, res) {
        try {
            const order = {
                status: req.body.status
            };
            await this.model.update(req.body.orderID, order);
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = OrdersController;