'use strict';
const compose = require('koa-compose');
function run(fun) {
  return compose([
    function* (next) {
      try {
        let result = yield fun.call(this)
        if (result.msg) {
          this.body = {
            code: 0,
            data: result
          }
        } else {
          this.body = {
            code: 0,
            data: result.data,
            msg:result.msg
          }
        }
      } catch (ex) {
        if (ex.code) {
          this.body = {
            code: ex.code,
            msg: ex.msg
          }
        } else {
          this.body = {
            code: -1,
            msg: ex.toString()
          }
        }

      }

    },
  ])
}
module.exports = run;