import productValidator from "../validators/products.validator.js";


class productsController {
    async getAll(req, res) {
        let products = await productValidator.getAll(req, res)
        if (products) {
            req.logger.info('Pedido de productos exitoso')
            res.status(200).json({ info: req.session.user, products })
        } else {
            req.logger.error('Error en la petición de productos')
            res.status(201).json({ info: "error" })
        }
    }

    async getById(req, res) {
        const product = await (productValidator.getById(req, res))
        if (product) {
            req.logger.info('Pedido de producto exitoso')
            res.status(200).json(product)
        } else {
            req.logger.error('Error en la petición de productos')
            res.status(201).json({ info: "error" })
        }
    }

    async getMockingProducts(req, res) {
        const products = await (productValidator.getMockingProducts(req, res))
        res.status(200).json(products)
    }

    async createProduct(req, res) {
        const product = await productValidator.createProduct(req, res)
        if (product) {
            req.logger.info('Creacion de producto exitosa')
            res.status(201).json({ info: "Created", product })
        }
        else {
            req.logger.error('Creacion de productos fallida')
            res.status(201).json({ info: "error" })
        }
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