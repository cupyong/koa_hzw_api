'use strict';
let baseService = require('./baseService')
class ArticleService extends baseService{
  *getNav() {
     let nav = yield models.nav.find({ level: 1 })
     return setResult(nav,"查询成功")
  }
  *getList(){
      let list = yield models.content.find({}).sort({'_id':1}).skip(0).limit(10)
      return setResult(list,"查询成功")
  }
  *add() {
    this.body = { a: 1 }
  }
}
let articleService = new ArticleService()
module.exports = articleService;