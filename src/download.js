'use strict';
var http = require("http");
var iconv = require('iconv-lite');
var co = require("co");
var thunkify = require("thunkify");
var Q = require('q');

// var option = {
//     hostname: "stockdata.stock.hexun.com",
//     path: "/gszl/s601398.shtml"
// };

// let sendGetRequest = thunkify(function (uri, data, next){
//     request({
//         uri: uri,
//         method: 'GET',
//         qs: data,
//         timeout: config.timeout * 10000,
//     }, function (err, ret, body) {
//         if (err) {
//             next(err, false);
//         }
//         else {
//             //let retObj = JSON.parse(body);
//             next(null, body);
//         }
//     });
// });

var promise = new Promise(function(resolve, reject) {
    http.get('http://m.hc360.com/info-ep/list/001022-001-004-1.html', function(res) {
        resolve(res);
    })
})

    // if (/* 异步操作成功 */){
    //     resolve(value);
    // } else {
    //     reject(error);
    // }

// promise.then(function(value) {
//       console.log(value)
// }, function(value) {
//
// });
co(function *() {
    let res = yield  promise;
    res.on("data", function (chunk) {
         let result = iconv.decode(chunk, "gbk")
         console.log(result)
    });
})



//
// let aaa= thunkify(http.get)
// co(function *() {
//     console.log(111)
//     let res = yield aaa('http://m.hc360.com/info-ep/list/001022-001-004-1.html')
//     console.log(res)
//     res.on("data", function(chunk) {
//         console.log(iconv.decode(chunk, "gbk"));
//     });
// })
// var req = http.get('http://m.hc360.com/info-ep/list/001022-001-004-1.html', function(res) {
//     res.on("data", function(chunk) {
//         console.log(iconv.decode(chunk, "gbk"));
//     });
// }).on("error", function(e) {
//     console.log(e.message);
// });
//
// req.end();