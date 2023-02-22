import {Router} from 'express';
import {userModel} from '../models/user.model.js';

const router = Router();

router.post('/register', async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body;

    if(!first_name || !last_name || !email || !age || !password){
        req.flash('error', 'Es necesario completar todos los campos para el registro');
        return res.status(400).redirect('/register');
    }

    let rol = 'usuario'
    if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
        rol = 'admin'
    } 

    try {
        const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password,
            role: rol
        })
        req.flash('success','Usuario creado exitosamente');
        res.status(201).redirect('/')
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email, password});
        if(!user){
            req.flash('error','Los datos ingresados no son validos');
            return res.status(400).redirect('/login');
        }
    delete user.password;
    req.session.user = user;
    console.log(user);
    req.flash('success','Sesion iniciada correctamente');
    res.status(200).redirect('/profile')
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login')
})

export default router

