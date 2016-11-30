//加载全局变量
'use strict';

global.config = require('../common/config');
global.models  =require('./load_models')
global.co = require('co');
global.Exception = function (code, msg) {
   throw{
       code:code,
       msg:msg
   }
};
global.setResult = function (data, msg) {
   return {
       data:data,
       msg:msg||""
   }
};


