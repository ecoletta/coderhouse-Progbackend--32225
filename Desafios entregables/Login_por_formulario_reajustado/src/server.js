import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import __dirname from './dirname.js';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import viewRoutes from './routes/views.routes.js';
import sessionRoutes from './routes/session.routes.js';
import flash from 'connect-flash';


const app = express();

//Server config
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('public'));

//Mongo config
mongoose.set('strictQuery', true)
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb://localhost:27017/coderLogin",
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 60,
        }),
        secret:"coderhouse",
        resave: false,
        saveUninitialized:false,
    })
);

mongoose.connect("mongodb://localhost:27017/coderLogin")
    .then( () => console.log("Conected to MongoDB - Login por formulario"));

//Handlebars config
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

//Routes
app.use('/', viewRoutes);
app.use('/session', sessionRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));

