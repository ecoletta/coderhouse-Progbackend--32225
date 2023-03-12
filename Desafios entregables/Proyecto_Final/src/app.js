import express from 'express';
import __dirname from './utils.js'
import routes from './routes/index.routes.js'
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import flash from 'connect-flash';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializaPassport from './config/passport.config.js';
import config from './config/config.js';

//Config server
const app = express()
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(__dirname + '/public'))

//////////////// Mongo DB >>>>>>>>>>>>>>
mongoose.set('strictQuery', true);

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.mongoUrl,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: 120,
        }),
        secret: config.secret,
        resave: false,
        saveUninitialized: false
    })
);

mongoose.connect(config.mongoUrl, (error) => {
    if (error) {
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
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())

////////////////ROUTING////////////////
app.use('/', routes)

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))
console.log(config)


