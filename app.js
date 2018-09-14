var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var routes = require('./src/routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

for (const routePath in routes) {
    if (routes.hasOwnProperty(routePath)) {
        for (const route of routes[routePath]) {
            app.use(routePath, route);
        }
    }
}

app.use(function(req, res, next){
    res.status(404).send({
        error: 'Page not found'
    });
});

module.exports = app;
