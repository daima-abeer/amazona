// const Products = require('../models/products');
const Model = require('../models/index');
class Cart extends Model {
    constructor(db, session) {
        super(db, 'products')
        this.session = session;
        //this.products = new Products(db);
    }
    get items() {
        return this.session.cart || [];
    }

    set items(items) {
        this.session.cart = items;
    }

    async all() {
        const cartItems = this.items;
        const productIds = cartItems.map(item => item.productId);
        const products = await this.findByAllIds(productIds);
        let total = 0;
        const cartProducts = cartItems.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            return {
                product,
                quantity: item.quantity,
                total: itemTotal
            };
        });
        return [cartProducts, total];
    }


    addItem(productId) {
        const cartItems = this.items;
        const existingItem = cartItems.find((item) => item.productId === productId);
        (existingItem) ? existingItem.quantity++ : cartItems.push({ productId, quantity: 1 });
        this.items = cartItems;
    }

    removeItem(productId) {
        const cartItems = this.items;
        this.items = cartItems.filter(item => item.productId !== productId);
    }

    updateItem(productId, quantity) {
        const cartItems = this.items;
        const existingItem = cartItems.find((item) => item.productId === productId);
        if (existingItem) {
            existingItem.quantity = quantity;
        }
        this.items = cartItems;
    }

    clear() {
        this.items = [];
    }

    get totalQuantity() {
        return this.items.length;
    }
}

module.exports = Cart;