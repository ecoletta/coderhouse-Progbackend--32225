import {Router} from 'express';
import viewController from '../controllers/view.controller.js';

const router = Router()

router.get('/', viewController.getIndex)
router.get('/register', viewController.getRegister)
router.get('/login', viewController.getLogin)
router.get('/profile', viewController.getProfile)

export default router;