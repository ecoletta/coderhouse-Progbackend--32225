import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: [{
        type: 
            {
                product:{type: Schema.Types.ObjectId, ref: 'products'}
        }
    }]
})

export const cartModel = model(cartCollection, cartSchema);