import { Schema, model } from "mongoose";

const productCollection = 'products';

const productSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true},
    price: { type: Number, require: true },
    codigo: {type: String, require: true},
    category: {type: String, require: true},
    thumbnail: {type: String, require: true},
    stock: {type: Number, require: true},
    status: {type: Boolean, require: true, default: true}
})

export const productModel = model(productCollection, productSchema);