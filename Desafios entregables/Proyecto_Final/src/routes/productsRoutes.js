import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router()

router.get('/', async (req, res) =>{
    const {limit} = req.query
    let products = await ProductManager.getProducts()

    if(!limit){
        res.status(200).json(products)
    }else{
        products = products.splice(0,limit)
        res.status(200).json(products)
    }
    
})

router.get('/:idCodigo', async (req, res) =>{
    const idCodigo = parseInt( req.params.idCodigo )
    const product = await (ProductManager.getProductById(idCodigo))
    res.status(200).json(product)
})

router.post('/', (req, res) => {
    const { title, description, codigo, price, status = true, stock, category, thumbnail } = req.body

    if (!title){
        throw new Error('Title is required')
    }

    if (!description){
        throw new Error('Description is required')
    }

    if (!codigo){
        throw new Error('Codigo is required')
    }

    if (!price){
        throw new Error('Price is required')
    }

    if (!status){
        throw new Error('Status is required')
    }

    if (!stock){
        throw new Error('Stock is required')
    }

    if (!category){
        throw new Error('Category is required')
    }

    if (!thumbnail){
        throw new Error('Thumbnail is required')
    }

    const product = {
        "title" : title,
        "description": description,
        "codigo": codigo,
        "price": price,
        "status": status,
        "stock": stock,
        "category": category,
        "thumbnail": thumbnail
    }
    ProductManager.agregarProducto(product)

    res.status(201).json({info : "Created", product })

})

router.put('/:idCodigo', async (req, res) =>{
    const idCodigo = req.params.idCodigo
    const { title, description, codigo, price, status = true, stock, category, thumbnail } = req.body

    if (!title){
        throw new Error('Title is required')
    }

    if (!description){
        throw new Error('Description is required')
    }

    if (!codigo){
        throw new Error('Codigo is required')
    }

    if (!price){
        throw new Error('Price is required')
    }

    if (!status){
        throw new Error('Status is required')
    }

    if (!stock){
        throw new Error('Stock is required')
    }

    if (!category){
        throw new Error('Category is required')
    }

    if (!thumbnail){
        throw new Error('Thumbnail is required')
    }

    const product = {
        "title" : title,
        "description": description,
        "idCodigo": parseInt(idCodigo),
        "codigo": codigo,
        "price": price,
        "status": status,
        "stock": stock,
        "category": category,
        "thumbnail": thumbnail
    }

    await ProductManager.updateProduct(product)

    res.status(200).json({info: "Product Updated", product})
})

router.delete('/:idCodigo', async (req, res) => {
    const idCodigo = parseInt( req.params.idCodigo)
    
    const respuesta = await ProductManager.deleteProduct(idCodigo)
    console.log(respuesta)
    res.status(200).json({info: respuesta})

})

router.get('*',(req, res) => {
    res.status(404).send("Recurso no encontrado en /api/products/*")
})

export default router