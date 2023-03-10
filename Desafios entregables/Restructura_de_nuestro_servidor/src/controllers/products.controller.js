import ProductManager from "../daos/dbManager/product.dao.js"

class productsController {
    async getAll(req, res) {
        const { limit, page, sort, query } = req.query

        let products = await ProductManager.getProducts(limit, page, sort, query)
        res.status(200).json({ info: req.session.user, products })
    }

    async getById(req, res) {
        const product = await (ProductManager.getProductById(req.params.id))
        res.status(200).json(product)
    }

    async createProduct(req, res) {
        const { title, description, codigo, price, status = true, stock, category, thumbnail } = req.body

        if (!title) {
            throw new Error('Title is required')
        }

        if (!description) {
            throw new Error('Description is required')
        }

        if (!codigo) {
            throw new Error('Codigo is required')
        }

        if (!price) {
            throw new Error('Price is required')
        }

        if (!status) {
            throw new Error('Status is required')
        }

        if (!stock) {
            throw new Error('Stock is required')
        }

        if (!category) {
            throw new Error('Category is required')
        }

        if (!thumbnail) {
            throw new Error('Thumbnail is required')
        }

        const product = {
            "title": title,
            "description": description,
            "codigo": codigo,
            "price": price,
            "status": status,
            "stock": stock,
            "category": category,
            "thumbnail": thumbnail
        }

        await ProductManager.agregarProducto(product)

        res.status(201).json({ info: "Created", product })
    }

    async updateProduct(req, res) {
        const { title, description, codigo, price, status = true, stock, category, thumbnail } = req.body

        if (!title) {
            throw new Error('Title is required')
        }

        if (!description) {
            throw new Error('Description is required')
        }

        if (!codigo) {
            throw new Error('Codigo is required')
        }

        if (!price) {
            throw new Error('Price is required')
        }

        if (!status) {
            throw new Error('Status is required')
        }

        if (!stock) {
            throw new Error('Stock is required')
        }

        if (!category) {
            throw new Error('Category is required')
        }

        if (!thumbnail) {
            throw new Error('Thumbnail is required')
        }

        const product = {
            "title": title,
            "description": description,
            "codigo": codigo,
            "price": price,
            "status": status,
            "stock": stock,
            "category": category,
            "thumbnail": thumbnail
        }

        await ProductManager.update(req.params.id, product)

        res.status(200).json({ info: "Product Updated", product })
    }

    async deleteProduct(req, res) {
        const respuesta = await ProductManager.delete(req.params.id)
        console.log(respuesta)
        res.status(200).json({ info: respuesta })
    }
}

export default new productsController();