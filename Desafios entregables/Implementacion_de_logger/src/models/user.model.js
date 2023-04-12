import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number, required: true},
    password: {type: String, default: 'user'},
    role: {type: String, required: true, default: 'usuario'},
    cart: {type: String, default: ''}
})

export const userModel = model('users', userSchema);