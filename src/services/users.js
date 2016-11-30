'use strict';
let baseService = require('./baseService')
class UserService extends baseService{
  *getList() {
    console.log(this.params.id)
    return { a: 11212 }
    // let user = yield models.user.create({ name: "1" })
    // this.body = { a: 1 }
   }
  *add() {
    return { a: 112121111 }
  }
}
let userService = new UserService()
module.exports = userService;