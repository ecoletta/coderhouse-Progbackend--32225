import cartServices from "../services/cart.services.js";

class cartValidator {
    async getById(req, res) {
        try {
            return await cartServices.getCartById(req.params.id)
        } catch (error) {
            console.log(error.message)
        }
    }

    async addProductInCart(req, res) {
        try {
            const idCart = req.params.idCart
            const idProduct = req.params.idProduct

            //Obtengo los productos del carrito indicado
            const cart = await cartServices.getCartById(idCart)

            //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
            if (!cart) {
                res.status(201).json({ info: "Cart not found" })
                return
            }

            //Identifico si el producto a agregar esta dentro del array del carrito
            const indiceProduct = cart.products.findIndex(item => item.id === idProduct)

            //Si el producto es nuevo en el carrito, lo agrego. Si ya existia incremento quantity
            if (indiceProduct === -1) {
                cart.products.push({ "id": idProduct, "quantity": 1 })
            } else {
                cart.products[indiceProduct].quantity++
            }

            //Actualizo el carrito en la BD con la nueva informacion.
            const resultado = await cartServices.updateCart(idCart, cart.products)

            //Informo que el producto fue agregado o no
            let info
            if (resultado) {
                info = "Product added in cart"
            } else {
                info = "Cart not found"
            }
            return info

        } catch (error) {
            console.log(error.message)
        }
    }

    async addCart(req, res) {
        try {
            const product = req.body
            await cartServices.agregarcarrito(product)
            return
        } catch (error) {
            console.log(error.message)
        }
    }

    async updateCart(req, res) {
        try {
            const idCart = req.params.idCart
            const product = req.body

            //Obtengo los productos del carrito indicado
            const cart = await cartServices.getCartById(idCart)

            //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
            if (!cart) {
                res.status(201).json({ info: "Cart not found" })
                return
            }

            //Actualizo el carrito en la BD con la nueva informacion.
            const resultado = await cartServices.updateCart(idCart, product.products)

            //Informo que el producto fue agregado o no
            let info
            if (resultado) {
                info = "Product added in cart"
            } else {
                info = "Error"
            }
            return info

        } catch (error) {
            console.log(error.message)
        }
    }

    async updateProductInCart(req, res) {
        try {
            const idCart = req.params.idCart
            const idProduct = req.params.idProduct
            const quantity = req.body.quantity

            //Obtengo los productos del carrito indicado
            const cart = await cartServices.getCartById(idCart)

            //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
            if (!cart) {
                res.status(201).json({ info: "Cart not found" })
                return
            }

            //Identifico si el producto a modificar existe dentro del array
            const indiceProduct = cart.products.findIndex(item => item.id === idProduct)

            //Si el producto no existe salgo de la rutina. Si existe incremento el quantity
            if (indiceProduct === -1) {
                res.status(201).json({ info: "Product not found in cart" })
                return
            } else {
                cart.products[indiceProduct].quantity = quantity;
            }

            //Actualizo el carrito en la BD con la nueva informacion.
            const resultado = await cartServices.updateCart(idCart, cart.products)

            //Informo que el producto fue actualizado
            let info
            if (resultado) {
                info = "Product Updated"
            } else {
                info = "Product not found"
            }
            return info
        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteProductInCart(req, res) {
        try {
            const idCart = req.params.idCart
            const idProduct = req.params.idProduct

            //Obtengo los productos del carrito indicado
            const cart = await cartServices.getCartById(idCart)

            //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
            if (!cart) {
                res.status(201).json({ info: "Cart not found" })
                return
            }

            //Identifico si el producto a eliminar existe dentro del array
            const indiceProduct = cart.products.findIndex(item => item.id === idProduct)

            //Si el producto no existe salgo de la rutina. Si existe lo elimino
            if (indiceProduct === -1) {
                res.status(201).json({ info: "Product not found in cart" })
                return
            } else {
                cart.products.splice(indiceProduct, 1);
            }

            //Actualizo el carrito en la BD con la nueva informacion.
            const resultado = await cartServices.updateCart(idCart, cart.products)

            //Informo que el producto fue agregado o no
            let info
            if (resultado) {
                info = "Product deleted"
            } else {
                info = "Product not found"
            }
            return info

        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteCart(req, res) {
        try {
            const idCart = req.params.idCart

            //Obtengo los productos del carrito indicado
            const cart = await cartServices.getCartById(idCart)

            //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
            if (!cart) {
                res.status(201).json({ info: "Cart not found" })
                return
            }

            //Actualizo el carrito en la BD con la nueva informacion.
            const resultado = await cartServices.updateCart(idCart, [])

            //Informo que el producto fue agregado o no
            let info
            if (resultado) {
                info = "Cart Cleared"
            } else {
                info = "Error"
            }
            return info
            
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default new cartValidator();