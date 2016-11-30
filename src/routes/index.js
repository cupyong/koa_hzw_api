'use strict';
var Router = require("koa-router")();
var users = require('./users');
var articles = require('./articles');
module.exports = function(app) {
    Router.use('/api/users', users.routes(), users.allowedMethods());
    Router.use('/api/article', articles.routes(), articles.allowedMethods());
    app.use(Router.routes());
};
