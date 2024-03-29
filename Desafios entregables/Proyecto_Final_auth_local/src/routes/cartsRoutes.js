import { Router } from "express";
import CartManager from "../daos/dbManager/cart.dao.js";

const router = Router()

router.get('/:id', async (req, res) =>{
    const cart = await CartManager.getCartById(req.params.id)
    res.status(200).json(cart)
})

router.post('/:idCart/product/:idProduct', async (req, res) => {
    const idCart = req.params.idCart
    const idProduct = req.params.idProduct

    //Obtengo los productos del carrito indicado
    const cart = await CartManager.getCartById(idCart)

    //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
    if(!cart){
        res.status(201).json({info: "Cart not found"})
        return
    }

    //Identifico si el producto a agregar esta dentro del array del carrito
    const indiceProduct = cart.products.findIndex(item => item.id === idProduct)
    console.log("El indice del producto es : ", indiceProduct)

    //Si el producto es nuevo en el carrito, lo agrego. Si ya existia incremento quantity
    if (indiceProduct === -1) {
        cart.products.push({"id": idProduct, "quantity": 1})
    } else {
        cart.products[indiceProduct].quantity++
    }
    
    //Actualizo el carrito en la BD con la nueva informacion.
    const resultado = await CartManager.updateCart(idCart, cart.products)
    
    //Informo que el producto fue agregado o no
    let info
    if (resultado){
        info = "Product added in cart"
    }else{
        info = "Cart not found"
    }

    res.status(201).json({info: info})
})

router.post('/', async (req, res) => {
    const product = req.body
    await CartManager.agregarcarrito(product)

    res.status(201).json({info: "Cart created"})
})

router.put('/:idCart', async(req, res) =>{
    const idCart = req.params.idCart
    const product = req.body

    //Obtengo los productos del carrito indicado
    const cart = await CartManager.getCartById(idCart)

    //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
    if(!cart){
        res.status(201).json({info: "Cart not found"})
        return
    }

    //Actualizo el carrito en la BD con la nueva informacion.
    const resultado = await CartManager.updateCart(idCart, product.products)

    //Informo que el producto fue agregado o no
    let info
    if (resultado){
        info = "Product added in cart"
    }else{
        info = "Error"
    }
    res.status(201).json({info: info})
})

router.put('/:idCart/product/:idProduct', async (req,res) =>{
    const idCart = req.params.idCart
    const idProduct = req.params.idProduct
    const quantity = req.body.quantity

    //Obtengo los productos del carrito indicado
    const cart = await CartManager.getCartById(idCart)

    //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
    if(!cart){
        res.status(201).json({info: "Cart not found"})
        return
    }

    //Identifico si el producto a modificar existe dentro del array
    const indiceProduct = cart.products.findIndex(item => item.id === idProduct)
    console.log("El indice del producto es : ", indiceProduct)

    //Si el producto no existe salgo de la rutina. Si existe incremento el quantity
    if (indiceProduct === -1){
        res.status(201).json({info: "Product not found in cart"})
        return
    } else {
        cart.products[indiceProduct].quantity = quantity;
    }

    //Actualizo el carrito en la BD con la nueva informacion.
    const resultado = await CartManager.updateCart(idCart, cart.products)

    //Informo que el producto fue actualizado
    let info
    if (resultado){
        info = "Product Updated"
    }else{
        info = "Product not found"
    }

    res.status(201).json({info: info})

})

router.delete('/:idCart/product/:idProduct', async (req, res) => {
    const idCart = req.params.idCart
    const idProduct = req.params.idProduct

    //Obtengo los productos del carrito indicado
    const cart = await CartManager.getCartById(idCart)

    //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
    if(!cart){
        res.status(201).json({info: "Cart not found"})
        return
    }

    //Identifico si el producto a eliminar existe dentro del array
    const indiceProduct = cart.products.findIndex(item => item.id === idProduct)
    console.log("El indice del producto es : ", indiceProduct)

    //Si el producto no existe salgo de la rutina. Si existe lo elimino
    if (indiceProduct === -1){
        res.status(201).json({info: "Product not found in cart"})
        return
    } else {
        cart.products.splice(indiceProduct,1);
    }

    //Actualizo el carrito en la BD con la nueva informacion.
    const resultado = await CartManager.updateCart(idCart, cart.products)

    //Informo que el producto fue agregado o no
    let info
    if (resultado){
        info = "Product deleted"
    }else{
        info = "Product not found"
    }

    res.status(201).json({info: info})
})

router.delete('/:idCart', async(req, res) => {
    const idCart = req.params.idCart

    //Obtengo los productos del carrito indicado
    const cart = await CartManager.getCartById(idCart)

    //Valido si el carrito existe. En caso que no exista responde y termina la funcion.
    if(!cart){
        res.status(201).json({info: "Cart not found"})
        return
    }

    //Actualizo el carrito en la BD con la nueva informacion.
    const resultado = await CartManager.updateCart(idCart, [])

    //Informo que el producto fue agregado o no
    let info
    if (resultado){
        info = "Cart Cleared"
    }else{
        info = "Error"
    }
    res.status(201).json({info: info})
})

router.get('*',(req, res) => {
    res.status(404).send("Recurso no encontrado en /api/carts/*")
})

export default router