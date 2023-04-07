import {Router} from 'express';
import viewRoutes from './view.routes.js';
import productsRoutes from './products.routes.js';
import cartsRoutes from './carts.routes.js';
import sessionRoutes from './session.routes.js';

const router = Router();

router.use('/', viewRoutes);
router.use('/api/products', productsRoutes);
router.use('/api/carts', cartsRoutes);
router.use('/api/session', sessionRoutes);

router.get('*', (req, res) => {
    res.status(404).send("Recurso no encontrado en /*")
})

export default router;