import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {type: Schema.Types.ObjectId, ref: 'products'}
            }
        ],default: []
    }
})

//En algun momento tengo que meter el polutate ahi en products y el pre

export const cartModel = model(cartCollection, cartSchema);