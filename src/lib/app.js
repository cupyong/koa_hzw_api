'use strict';
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const json = require('koa-json')
const compress = require("koa-compress");
const app = require('koa')();
app.use(bodyParser());
app.use(compress());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(json());
require('../routes')(app);
app.listen(config.port, function () {
    console.log('Koa server listening on %d, in %s mode', config.port, app.env);
});