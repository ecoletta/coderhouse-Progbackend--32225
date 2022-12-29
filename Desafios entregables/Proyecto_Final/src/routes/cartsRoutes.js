import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";

const router = Router()

router.get('/:idCodigo', async (req, res) =>{
    const idCodigo = req.params.idCodigo
    const cart = await CartManager.getCartById(idCodigo)

    res.status(200).json(cart)
})

router.post('/:idCart/product/:idProduct', async (req, res) => {
    const idCart = parseInt(req.params.idCart)
    const idProduct = parseInt(req.params.idProduct)

    const product = await ProductManager.getProductById(idProduct)
    await CartManager.updateCart(product,idCart)

    res.status(201).json({info: "Product added in cart"})
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