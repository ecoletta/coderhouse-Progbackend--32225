import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router()

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct)
router.delete('/:id', productsController.deleteProduct)

export default router