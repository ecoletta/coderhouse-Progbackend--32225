import { isString } from "underscore";
import { productModel } from "../../models/product.model.js";

class ProductDao {
    async agregarProducto(product){
        return await productModel.create(product);
    }

    async getProductById(id){
        return await productModel.findById(id)
    }

    async getProducts(limit = 10, sort, query){

        const consulta = query
        console.log("La consulta que quiero meter en find() es:" ,consulta)
        return await productModel.find({category:{$eq:"RPG"}}).sort({price: sort }).limit(limit);
    }

    async update(id, product){
        return await productModel.findByIdAndUpdate(id, product, {new: true});
    }

    async delete(id){
        return await productModel.findByIdAndDelete(id);
    }

}

export default new ProductDao();