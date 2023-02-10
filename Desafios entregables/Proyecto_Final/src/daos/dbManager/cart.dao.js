import { cartModel } from "../../models/cart.model.js";

class CartDao{
    async agregarcarrito(products){
        return await cartModel.create({ "products": products });
    }

    async getCartById(id){
        return await cartModel.findById(id);
    }

    async updateCart(idCart,product){
        return await cartModel.findByIdAndUpdate(idCart, {"products": product})
    }
}

export default new CartDao();