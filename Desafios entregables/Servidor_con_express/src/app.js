import express from 'express'
import productManager from './ProductManager.js'

const app = express()
app.use(express.urlencoded({extended:true}))

///////////////RUTEO>>>>>>>>>>>>>>>
app.get('/',(req, res) => {
    res.send('Hola server')
})


app.get('/products', async (req, res) => {
    const {limit} = req.query
    let products = productManager.getProducts()
    if (!limit){
        res.json(products)
    }else{
        products = products.splice(0,limit)
        res.json(products)
    }
})

app.get('/products/:idCodigo', async (req, res) => {
    const idCodigo = parseInt( req.params.idCodigo)
    const products = productManager.getProducts()
    const product = products.filter((item) => item.idCodigo === idCodigo)
    res.json(product)
})

app.get('*', (req, res) =>{
    res.send('Recurso no encontrado')
})

///////////////RUTEO<<<<<<<<<<<<<<<

app.listen(3000, () => console.log('Listening on port 3000'))