// загружаем .env
require('dotenv').load();

// инциализируем express
const express = require('express');
const app = express();

// добавляем поддержку form
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// регистрация роутов
const routes = require('./routes/index');
for (const [routePath, routeData] of routes) {
    app.use(routePath, routeData);
}

app.use(function (req, res, next) {
    res.status(404).send({
        error: 'Page not found'
    });
});

module.exports = app;
