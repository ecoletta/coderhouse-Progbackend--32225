import { productModel } from "../../models/product.model.js";

class ProductDao {
    async agregarProducto(product){
        return await productModel.create(product);
    }

    async getProductById(id){
        return await productModel.findById(id)
    }

    async getProducts(limit = 10, page = 1, sort = '1', query){

        if(!query){
            return await productModel.paginate({},{page: page, limit: limit, sort: sort});
        }else{
            return await productModel.paginate({category:{$eq:query}},{page: page, limit: limit, sort: sort});
        }
    }

    async update(id, product){
        return await productModel.findByIdAndUpdate(id, product, {new: true});
    }

    async delete(id){
        return await productModel.findByIdAndDelete(id);
    }

}

export default new ProductDao();