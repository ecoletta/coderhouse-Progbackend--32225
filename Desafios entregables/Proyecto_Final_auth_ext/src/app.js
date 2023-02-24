import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productsRoutes from './routes/productsRoutes.js'
import cartsRoutes from './routes/cartsRoutes.js'
import viewRoutes from './routes/view.routes.js'
import sessionRoutes from './routes/session.routes.js'
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import flash from 'connect-flash';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializaPassport from './config/passport.config.js';

//Disponibilizo la variable __dirname 
const __dirname = dirname(fileURLToPath(import.meta.url));

//Github

const gitHubClientSecret = '1ea0762a8ec7de8e53a077b0a87d75c94e92e5c9'

//Config server
const app = express()
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', express.static(__dirname + '/public'))

//////////////// Mongo DB >>>>>>>>>>>>>>

mongoose.set('strictQuery', true);
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb://localhost:27017/ecommerce",
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: 120,
        }),
        secret: "coderhouse",
        resave: false,
        saveUninitialized: false
    })
);


mongoose.connect("mongodb://localhost:27017/ecommerce", (error) => {
    if(error) {
        console.log('Error al conectarse a MongoDB', error);
    } else {
        console.log('Conectado a Moongo DB - Database ecommerce')
    }
})

//////////////// Mongo DB <<<<<<<<<<<<<<

//Handlebars config
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

//Passport config
initializaPassport()
app.use(session({
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())


////////////////Endpoints y ruteos >>>>>>>>>>>>>>

app.use('/', viewRoutes);
app.use('/api/products/',productsRoutes)
app.use('/api/carts/',cartsRoutes)
app.use('/session', sessionRoutes)

app.get('*', (req, res) => {
    res.status(404).send("Recurso no encontrado en /*")
})

////////////////Endpoints y ruteos <<<<<<<<<<<<<<

app.listen(8080, () => console.log ('Listening on port 8080'))


