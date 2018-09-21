const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

var routes = require('./src/routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: '5Q#v@:b7KT3-+b]>',
    saveUninitialized: true,
    resave: false,
}));

for (const routePath in routes) {
    if (routes.hasOwnProperty(routePath)) {
        for (const route of routes[routePath]) {
            app.use(routePath, route);
        }
    }
}

app.use(function (req, res, next) {
    res.status(404).send({
        error: 'Page not found'
    });
});

module.exports = app;
