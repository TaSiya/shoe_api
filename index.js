const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const pg = require("pg");

const ShoeApi = require('./api/shoe_api');
const shoeServices = require('./services/shoeServices');
const Rounting = require('./routes/routing');

const Pool = pg.Pool;

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));
  
  app.use(flash());

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/shoe_api_db';

const pool = new Pool({
    connectionString,
    ssl : useSSL
});

const service = shoeServices(pool);
const api = ShoeApi(service);
const route = Rounting(service);

app.get('/', route.client);
app.get('/api/stock', api.getAll) // api 


const PORT = process.env.PORT || 2018 ;
app.listen(PORT, function () {
    console.log('Listening to port...'+ PORT);
})