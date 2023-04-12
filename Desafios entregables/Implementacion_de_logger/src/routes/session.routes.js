import { Router } from 'express';
import passport from 'passport';
import sessionController from '../controllers/session.controller.js';

const router = Router();

//RUTAS AUTH EXTERNAS (GITHUB)
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionController.redirectProfile);
router.get('/logout', sessionController.logoutSession);


//RUTAS AUTH LOCAL (JWT)
router.get('/current', passport.authenticate('jwt', { session: false }), sessionController.jwtCheck);

//RUTAS AUTH LOCAL (SESSION)
router.post('/register', sessionController.createUser);
router.post('/login', sessionController.loginUser);

export default router

