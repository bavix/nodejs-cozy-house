// загружаем .env
require('dotenv').load();

// инциализируем framework
const koa = require('koa');
const body = require('koa-body');
const json = require('koa-json');
const isAjax = require('koa-isajax');
const app = new koa();

app.use(isAjax());
app.use(body());
app.use(json({pretty: false}));

/**
 * @see https://github.com/koajs/koa/issues/599
 */
app.proxy = true;

// error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch ({ statusCode, status, message }) {
        ctx.status = statusCode || status || 500;
        ctx.body = {message};
    }
});

// routes
const apiEvent = require('./routes/api/event');

app.use(apiEvent.allowedMethods());
app.use(apiEvent.routes());

// throw
app.use((ctx, next) => {
    ctx.throw(404);
});

module.exports = app;
