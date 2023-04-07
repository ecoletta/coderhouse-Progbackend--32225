import cartValidator from "../validators/cart.validator.js";

class cartController {
    async getById(req, res) {
        const cart = await cartValidator.getById(req, res)
        res.status(200).json(cart)
    }

    async addProductInCart(req, res) {
        const info = await cartValidator.addProductInCart(req, res)
        res.status(201).json({ info: info })
    }

    async addCart(req, res) {
        await cartValidator.addCart(req, res)
        res.status(201).json({ info: "Cart created" })
    }

    async updateCart(req, res) {
        const info = await cartValidator.updateCart(req, res)
        res.status(201).json({ info: info })
    }

    async updateProductInCart(req, res) {
        const info = await cartValidator.updateProductInCart(req, res)
        res.status(201).json({ info: info })
    }

    async deleteProductInCart(req, res) {
        const info = await cartValidator.deleteProductInCart(req, res)
        res.status(201).json({ info: info })
    }

    async deleteCart(req, res) {
        const info = await cartValidator.deleteCart(req, res)
        res.status(201).json({ info: info })
    }
}

export default new cartController();