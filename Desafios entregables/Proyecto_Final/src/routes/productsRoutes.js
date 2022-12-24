import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router()

router.get('/', async (req, res) =>{
    const products = await ProductManager.getProducts()
    res.status(200).json(products)
})

router.get('/:idCodigo', async (req, res) =>{
    const idCodigo = parseInt( req.params.idCodigo )
    const product = await (ProductManager.getProductById(idCodigo))
    res.status(200).json(product)
})

router.get('*',(req, res) => {
    res.status(404).send("Recurso no encontrado en /api/products/*")
})

export default router