'use strict';
const auth = require('../lib/auth/');
const router = require("koa-router")();
const services = require("../services")
var run = require('../lib/run')
router.get('/nav',run(services.articles.getNav));
router.get('/aaa',auth.authToken(),services.users.add);
module.exports = router;