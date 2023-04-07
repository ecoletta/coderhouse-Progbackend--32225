import ProductManager from "../daos/mongo/product.dao.js";

class productServices {
    getProducts(limit, page, sort, query) {
        return ProductManager.getProducts(limit, page, sort, query)
    }

    getProductById(id) {
        return ProductManager.getProductById(id)
    }

    agregarProducto(product) {
        return ProductManager.agregarProducto(product)
    }

    update(id, product){
        return ProductManager.update(id,product)
    }

    delete(id){
        return ProductManager.delete(id)
    }
}

export default new productServices();