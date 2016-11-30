'use strict';
require('./bin/load_global.js');

const mongoose = require('mongoose');
let crawler = require('./common/crawler');
let jsdom = require('jsdom');

var startCrawler = new crawler({
    jQuery: jsdom,
    maxConnections: 10,
    forceUTF8: true,
    callback: function (err, result, $, options) {
         switch (options.type) {
            case 1:
                $('.IndexNav a').each(function (index, a) {
                    let nextUrl = $(a).attr('href')
                    if ($(a).html() != "更多") {
                        models.nav.create({
                            name: $(a).html(),
                            url: nextUrl,
                            level: options.type
                        },function (err,result) {
                                startCrawler.queue({
                                    uri:nextUrl+"list.html",
                                    type:2,
                                    parentId:result._id 
                                })
                      })
                    }
                });
                break;
            case 2:
               $('.ListBox2 dd a').each(function (index, a) {
                    let nextUrl = $(a).attr('href')
                      console.log(nextUrl)
                    models.nav.create({
                        name:$(a).html(),
                        url:nextUrl,
                        level:options.type,
                        parent_id:options.parentId
                    })
                });
                break; 
        }
    }
});
//分类抓取
// startCrawler.queue({
//     uri:"http://m.hc360.com/info/",
//     type:1 
// })







