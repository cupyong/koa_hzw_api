'use strict';
var bodyParser = require('koa-bodyparser');
const app = require('koa')();
require('../routes')(app);
app.use(bodyParser());
app.listen(config.port, function () {
    console.log('Koa server listening on %d, in %s mode', config.port, app.env);
});