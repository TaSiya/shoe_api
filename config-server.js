module.exports = function () {
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const flash = require('express-flash');
    const cors = require('cors')
    const app = express();
    
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