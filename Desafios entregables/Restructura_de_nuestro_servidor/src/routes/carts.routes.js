import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router()

router.get('/:id', cartController.getById);
router.post('/:idCart/product/:idProduct', cartController.addProductInCart);
router.post('/', cartController.addCart);
router.put('/:idCart', cartController.updateCart);
router.put('/:idCart/product/:idProduct', cartController.updateProductInCart);
router.delete('/:idCart/product/:idProduct', cartController.deleteProductInCart);
router.delete('/:idCart', cartController.deleteCart);

export default router