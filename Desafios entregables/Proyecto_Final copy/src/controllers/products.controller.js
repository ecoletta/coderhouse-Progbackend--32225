import productValidator from "../validators/products.validator.js";


class productsController {
    async getAll(req, res) {
        let products = await productValidator.getAll(req, res)
        res.status(200).json({ info: req.session.user, products })
    }

    async getById(req, res) {
        const product = await (productValidator.getById(req, res))
        res.status(200).json(product)
    }

    async createProduct(req, res) {
        const product = await productValidator.createProduct(req, res)
        res.status(201).json({ info: "Created", product })
    }

    async updateProduct(req, res) {
        const product = await productValidator.updateProduct(req, res)
        res.status(200).json({ info: "Product Updated", product })
    }

    async deleteProduct(req, res) {
        const respuesta = await productValidator.deleteProduct(req, res)
        res.status(200).json({ info: respuesta })
    }
}

export default new productsController();