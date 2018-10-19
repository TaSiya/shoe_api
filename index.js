const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const pg = require("pg");

const ShoeApi = require('./api/shoe_api');
const shoeServices = require('./services/shoeServices');

const Pool = pg.Pool;

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/shoe_api_db';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const service = shoeServices(pool);
const api = ShoeApi(service);

// API  
app.get('/api/stock', api.getAll);
app.get('/api/default', api.dropDowns);
app.get('/api/cart', api.cartSection);

app.post('/api/add', api.addStock);
app.get('/api/stock/:id', api.addCart)
app.get('/api/clearCart', api.deleteCart);
app.get('/api/clearStock', api.deleteStock);
app.get('/api/remove/:id', api.removeItemCart);
app.get('/api/filter/brand/:brand', api.filterByBrand);
app.get('/api/filter/colour/:colour', api.filterByColour);
app.get('/api/filter/size/:size', api.filterBySize);



const PORT = process.env.PORT || 2018;
app.listen(PORT, function () {
    console.log('Listening to port...' + PORT);
});