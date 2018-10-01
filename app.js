// загружаем .env
require('dotenv').load();

// инциализируем framework
const koa = require('koa');
const body = require('koa-body');
const json = require('koa-json');
const isAjax = require('koa-isajax');
const app = new koa();

app.use(isAjax());
app.use(json());
app.use(body());

/**
 * @see https://github.com/koajs/koa/issues/599
 */
app.proxy = true;

// routes
const apiEvent = require('./routes/api/event');

app.use(apiEvent.allowedMethods());
app.use(apiEvent.routes());

// throw
app.use(function (ctx, next) {
    ctx.status = 404;
    return next();
});

app.use(function(ctx) {
    const err = ctx.response;
    ctx.status = err.status ? err.status : 500;
    ctx.body = {
        error: err.message
    };
});

module.exports = app;
