// загружаем .env
require('dotenv').load();

// инциализируем express
const express = require('express');
const app = express();

// добавляем поддержку form
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// регистрация роутов
const routes = require('./routes/index');
for (const [routePath, routeData] of routes) {
    app.use(routePath, routeData);
}

app.use(function (req, res, next) {
    const error = new Error('Page not found');
    error.httpStatusCode = 404;
    next(error);
});

app.use(function(err, req, res, next) {
    res.status(err.httpStatusCode ? err.httpStatusCode : 500).send({
        error: err.message
    });
});

module.exports = app;
