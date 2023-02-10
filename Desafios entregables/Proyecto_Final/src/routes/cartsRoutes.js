import { Router } from "express";
//import CartManager from "../daos/fileManager/CartManager.js";
//import ProductManager from "../daos/fileManager/ProductManager.js";
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

router.get('*',(req, res) => {
    res.status(404).send("Recurso no encontrado en /api/carts/*")
})

export default router