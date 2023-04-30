const Products = require('../models/products');
class ProductsController {
    constructor(db) {
        this.products = new Products(db);
        this.index = this.index.bind(this);
    }

    async index(req, res) {
        const products = await this.products.all();
        res.render('index', { products });
    }

    async show(id) {
        return await this.products.findById(id);
    }

    async create(req, res) {
        try {
            const imgURL = '/images/' + req.file.filename;
            const data = {
                "name": req.body.name,
                "rating": req.body.rating,
                "thumbnail": imgURL,
                "price": req.body.price
            };
            await this.products.create(data);
            res.status(200).redirect('/admin/products');
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async edit(req, res) {
        const id = req.params.id;
        const product = await this.show(id)
        res.render('admin/product-form', { title: 'Edit Product', product, actionURL: '/admin/product/edit/' + id});
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const data = {}
            if (req.body.name) data.name = req.body.name;
            if (req.body.rating) data.rating = req.body.rating;
            if (req.body.price) data.price = req.body.price;
            if (req.file) data.thumbnail = '/images/' + req.file.filename;
            await this.products.update(id, data);
            res.status(200).redirect('/admin/products');
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async delete(req, res) {
        try {
            await this.products.delete(req.params.id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async search(req, res) {
        const keyword = req.query.keyword;
        const products = await this.products.search(keyword);
        res.render('index', { products });
    }

    async paginate(req, res) {
        const page = req.query.page || 1;
        const limit = 3;
        const offset = (page - 1) * limit;
        const products = await this.products.paginate(limit, offset);
        const totalItems = await this.products.count();
        const totalPages = Math.ceil(totalItems / limit);
        res.render('index', { products, totalPages });
    }

    async deleteProduct(req, res) {
        try {
            await this.model.delete(req.params.id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async adminProducts(req, res) {
        const products = await this.products.all();
        res.render('admin/products', { products });
    }

    async addProduct(req, res) {
        res.render('admin/product-form', { title: 'Add New Product', actionURL: '/admin/product/add'});
    }
}

module.exports = ProductsController;