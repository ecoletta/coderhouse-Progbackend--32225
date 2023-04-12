import ProductManager from "../daos/mongo/product.dao.js";
import {generateProducts} from '../utils/utils.js';

class productServices {
    getProducts(limit, page, sort, query) {
        return ProductManager.getProducts(limit, page, sort, query)
    }

    getProductById(id) {
        return ProductManager.getProductById(id)
    }

    getMockingProducts() {
        return generateProducts()
    }

    agregarProducto(product) {
        return ProductManager.agregarProducto(product)
    }

    update(id, product) {
        return ProductManager.update(id, product)
    }

    delete(id) {
        return ProductManager.delete(id)
    }
}

export default new productServices();