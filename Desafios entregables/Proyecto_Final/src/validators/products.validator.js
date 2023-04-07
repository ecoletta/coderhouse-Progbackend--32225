import productsServices from "../services/products.services.js";
import customError from "../services/errors/customError.js";
import errorList from '../services/errors/enums.js';
import { paramError } from "../services/errors/info.js";


class productValidator {
    async getAll(req, res) {
        try {
            const { limit, page, sort, query } = req.query
            let products = await productsServices.getProducts(limit, page, sort, query)
            return products
        } catch (error) {
            console.log(error.message)
        }
    }

    async getById(req, res) {
        try {
            return await (productsServices.getProductById(req.params.id))
        } catch (error) {
            console.log(error.message)
        }
    }

    async getMockingProducts(req, res) {
        try {
            return (productsServices.getMockingProducts(req, res))
        } catch (error) {
            console.log(error.message)
        }
    }

    async createProduct(req, res) {
        //try {
            const { title, description, codigo, price, status = true, stock, category, thumbnail } = req.body

            if (!title || !description || !codigo || !price || !status || !stock || !category || !thumbnail) {
                customError.createError({
                    name: 'Param Error',
                    cause: paramError({ title, description, codigo, price, status, stock, category, thumbnail }),
                    message: 'Uno o mas parametros necesarios para el alta del producto no fue definido.',
                    code: errorList.INVALID_PARAMS
                })
         }

            const product = {
                "title": title,
                "description": description,
                "codigo": codigo,
                "price": price,
                "status": status,
                "stock": stock,
                "category": category,
                "thumbnail": thumbnail
            }

            await productsServices.agregarProducto(product)
            return product

        //} catch (error) {
        //    console.log(error.message)
        //}
    }

    async updateProduct(req, res) {
        try {
            const { title, description, codigo, price, status = true, stock, category, thumbnail } = req.body

            if (!title) {
                throw new Error('Title is required')
            }

            if (!description) {
                throw new Error('Description is required')
            }

            if (!codigo) {
                throw new Error('Codigo is required')
            }

            if (!price) {
                throw new Error('Price is required')
            }

            if (!status) {
                throw new Error('Status is required')
            }

            if (!stock) {
                throw new Error('Stock is required')
            }

            if (!category) {
                throw new Error('Category is required')
            }

            if (!thumbnail) {
                throw new Error('Thumbnail is required')
            }

            const product = {
                "title": title,
                "description": description,
                "codigo": codigo,
                "price": price,
                "status": status,
                "stock": stock,
                "category": category,
                "thumbnail": thumbnail
            }

            await productsServices.update(req.params.id, product)
            return product

        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteProduct(req, res) {
        try {
            const respuesta = await productsServices.delete(req.params.id)
            return respuesta
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default new productValidator();