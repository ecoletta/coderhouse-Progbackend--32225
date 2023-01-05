import express from 'express';
import __dirname from './dirname.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import {Server} from 'socket.io';

const products = [
	{
		"title": "Zelda Ocarina of time",
		"description": "Juego Nintendo 64",
		"price": 500,
		"codigo": "codigo1",
		"idCodigo": 1,
		"thumbnail": "Imagen",
		"stock": 10
	},
	{
		"title": "Zelda Majora Mask",
		"description": "Juego Nintendo 64",
		"price": 500,
		"codigo": "codigo2",
		"idCodigo": 2,
		"thumbnail": "Imagen",
		"stock": 10
	},
	{
		"title": "God of War",
		"description": "Juego PS4",
		"price": 500,
		"codigo": "codigo3",
		"idCodigo": 3,
		"thumbnail": "Imagen",
		"stock": 10
	},
	{
		"title": "Final Fantasy XV",
		"description": "Juego PS4",
		"price": 300,
		"codigo": "codigo4",
		"idCodigo": 4,
		"thumbnail": "Imagen",
		"stock": 15
	}
]

const app = express();
const httpServer = app.listen(3000, () => console.log(`Server corriendo en puerto ${3000}`));
const io = new Server(httpServer);

//////Configuracion express//////

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

//////Configuracion handlebars//////
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.set('view engine', 'hbs');
app.set('views',`${__dirname}/views`);



//////Routes//////
app.use('/', viewsRouter);

app.get('*', (req, res) =>{
    res.send("Recurso no encontrado")
})

//////Socket endpoints//////
io.on("connection", (socket) => {
    console.log("Se ha conectado un nuevo cliente")

    socket.emit('start', products)
})

export default products