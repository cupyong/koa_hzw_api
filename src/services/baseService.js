'use strict';
class baseService {
  setResult(result,code,msg) {
     return {
         code:0,
         data:result,
         msg:msg||""
     }
  }
}
module.exports = baseService;