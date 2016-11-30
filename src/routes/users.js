'use strict';
const auth = require('../lib/auth/');
const router = require("koa-router")();
const services = require("../services")
var run = require('../lib/run')

router.get('/list/:id',run(services.users.getList));
router.get('/aaa',auth.authToken(),run(services.users.add));
module.exports = router;