import { userModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/utils.js';
import jwt from 'jsonwebtoken';

class sessionValidator {
    async createUser(req, res) {
        try {
            const { first_name, last_name, email, age, password } = req.body;

            if (!first_name || !last_name || !email || !age || !password) {
                req.flash('error', 'Es necesario completar todos los campos para el registro');
                return res.status(400).redirect('/register');
            }

            let rol = 'usuario'
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                rol = 'admin'
            }
            try {
                const user = await userModel.create({
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: rol
                })
                req.flash('success', 'Usuario creado exitosamente');
                res.status(201).redirect('/login')
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            try {
                const user = await userModel.findOne({ email });
                if (!user) {
                    console.log('user:', user)
                    req.flash('error', 'El usuario no existe');
                    return res.status(400).redirect('/login');
                }

                if (!isValidPassword(user, password)) {
                    req.flash('error', 'Contraseña incorrecta')
                    console.log('Contraseña Incorrecta.')
                    return res.status(403).redirect('/login')
                }
                delete user.password;

                //Asigno los datos a la session
                req.session.user = user;
                console.log(user);

                //Armo el token
                const token = jwt.sign({ user }, 'coderSecret', { expiresIn: '10m' });
                res.cookie('coderCokieToken', token, { maxAge: 5000, httpOnly: false });
                console.log(token)

                req.flash('success', 'Sesion iniciada correctamente');
                res.status(200).redirect('/profile')
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default new sessionValidator();