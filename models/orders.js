const Model = require('./index');

class OrdersModel extends Model {
    constructor(db) {
        super(db, 'orders');
        this.details = new Model(db, 'order_details');
    }

    async createOrder(userId, cart) {
        const cartItems = await cart.all();
        const order = {
            customer_id: userId,
            total: cartItems[1]
        };
        const orderId = await this.create(order);
        const details = cartItems[0].map((item) => {
            return {
                order_id: orderId,
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.total
            };
        });
        await this.details.createMany(details);
        return orderId;
    }

    async getOrdersWithDetailsOfUser(userId) {
        return await this.join({
            table2: 'order_details',
            on: 'orders.id = order_details.order_id',
            fields: 'orders.*, SUM(order_details.quantity) AS total_quantity',
            groupBy: 'orders.id',
            where: 'orders.customer_id = ?',
            orderBy: 'orders.order_date DESC'
        }, [userId]);
    }

    async getAllOrdersWithDetails() {
        const query = "SELECT orders.id, GROUP_CONCAT(products.name, ' x ', order_details.quantity SEPARATOR '<br>') AS products, users.name AS customer_name, orders.order_date as order_date, orders.status, orders.total FROM orders JOIN order_details ON orders.id = order_details.order_id JOIN users ON orders.customer_id = users.id JOIN products ON order_details.product_id = products.id GROUP BY orders.id ORDER BY orders.order_date DESC";
        return await this.db.query(query);
    }
}

module.exports = OrdersModel;