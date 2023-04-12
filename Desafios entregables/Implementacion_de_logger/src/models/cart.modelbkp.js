import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {type: Array, require: true, default: []}
})

//En algun momento tengo que meter el polutare ahi en products y el pre

export const cartModel = model(cartCollection, cartSchema);