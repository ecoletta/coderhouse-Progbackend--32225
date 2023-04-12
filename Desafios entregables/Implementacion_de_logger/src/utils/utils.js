import bcrypt from 'bcrypt';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
export default __dirname

faker.locale = 'es';

export const generateProducts = () => {
    let numOfProducts = 100;
    let products = [];
    for (let i = 0; i < numOfProducts; i++ ){

        products.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        codigo: faker.database.mongodbObjectId(),
        category: faker.commerce.productAdjective(),
        thumbnail: faker.image.imageUrl(),
        stock: faker.datatype.number({min: 1, max: 500, precision: 1}),
        status: faker.datatype.boolean()
        })
    }
    return products
}