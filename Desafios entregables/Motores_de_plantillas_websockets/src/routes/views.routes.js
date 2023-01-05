import {Router} from 'express';
import products from '../server.js';

const router = Router();

router.get('/', (req, res) => {
    let saludo = {name: "Ezequiel", title: "Entregable Websocket",products}
    res.render('home',saludo)
});

router.get('/realtimeproducts', (req, res) => {
    let saludo = {name: "Ezequiel", title: "Entregable Websocket"}
    res.render('realtimeproducts',saludo)
});

export default router;