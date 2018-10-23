module.exports = function () {
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const flash = require('express-flash');
    const cors = require('cors')
    const app = express();
// var corsOptions = {
//     origin: 'https://kasi-shoe-api.herokuapp.com/api/',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
    
    app.use(cors());
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

    return app;
}