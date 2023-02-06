import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productsRoutes from './routes/productsRoutes.js'
import cartsRoutes from './routes/cartsRoutes.js'

//Disponibilizo la variable __dirname 
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', express.static(__dirname + '/public'))

////////////////Endpoints y ruteos >>>>>>>>>>>>>>

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html')
})

app.use('/api/products/',productsRoutes)
app.use('/api/carts/',cartsRoutes)

app.get('*', (req, res) => {
    res.status(404).send("Recurso no encontrado en /*")
})

////////////////Endpoints y ruteos <<<<<<<<<<<<<<

app.listen(8080, () => console.log ('Listening on port 8080'))


