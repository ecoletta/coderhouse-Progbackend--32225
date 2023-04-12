import CartManager from "../daos/mongo/cart.dao.js";

class cartServices {
    async getCartById(id) {
        return await CartManager.getCartById(id)
    }

    async updateCart(id, products) {
        return await CartManager.updateCart(id, products)
    }

    async agregarcarrito(product){
        return await CartManager.agregarcarrito(product)
    }
}

export default new cartServices();