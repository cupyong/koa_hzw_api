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
         if(err) console.log("err------------------",err.toString())
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
                    },function (err,contentresult) {
                        if(err){
                            console.log(err.toString,'=======================11111111')
                        }

                    })
                });
                break;
             case 3:
                 var title,contentUrl,introduction
                $('.NewsListImg').each(function (index,newlist) {
                    if($(newlist).find("h3 a").length>0){
                         title = $(newlist).find("h3 a").html()
                         contentUrl =$(newlist).find("h3 a").attr("href")
                        //var date = $(newlist).find(".nTime").html()
                         if($(newlist).find(".nListRight a").length>0){
                             introduction = $(newlist).find(".nListRight a").html()
                         }else{
                             introduction = $(newlist).find(".nListRight p").html()
                         }

                     }else{
                         title = $(newlist).find("h3").html()
                         contentUrl =$(newlist).find("a").attr("href")
                         introduction = $(newlist).find(".nListRight p").html()

                    }
                    // console.log(contentUrl)
                    models.content.create({
                        title:title,
                        url:contentUrl,
                        introduction:introduction,
                        level_first:options.level_first,
                        level_second:options.level_second
                    })

                })

                $('.NewsList').each(function (index,newlist) {
                     title = $(newlist).find("h3").html()
                     contentUrl =$(newlist).find("a").attr("href")
                     //var date = $(newlist).find(".nTime").html()
                     if($(newlist).find(".nListRight a").length>0){
                         introduction = $(newlist).find(".nListRight a").html()
                     }else{
                         introduction = $(newlist).find(".nListRight p").html()
                     }
                     models.content.create({
                         title:title,
                         url:contentUrl,
                         introduction:introduction,
                         level_first:options.level_first,
                         level_second:options.level_second
                     },function (err,contentresult) {
                         if(err){
                             console.log(err.toString,'=======================22222222')
                         }
                         
                     })

                 })

                 if($('.NewsListImg').length<1&&$('.NewsList').length<1){
                     console.log(options.uri,"nocontent")
                 }
                var maxPage= $(".pageBox span").html()
                if(maxPage){
                     var page = maxPage.split('/')[0];
                     var totalPage=parseInt(maxPage.split('/')[1]) ;
                     if(page=="1"){
                         let url = options.uri;
                         for(let i=1;i<totalPage;i++){
                             //startContentUrl2(url.substring(0,url.lastIndexOf('-'))+"-"+(i+1).toString()+".html",parentId)
                             startCrawler.queue({
                                 uri:url.substring(0,url.lastIndexOf('-'))+"-"+(i+1).toString()+".html",
                                 type:3,
                                 level_first:options.level_first,
                                 level_second:options.level_second
                             })
                         }
                     }
                }
                break;
             case 4:
                 var title = $(".dTopBox h1").html();
                 if(title){
                     var date=$(".dLeft").html()
                     var content_date;
                     if(date){
                         content_date = new Date(date.replace("年","-").replace("月","-").replace("日&nbsp;"," "))
                     }
                     var content =$(".dCon").html()
                     if(content_date){
                         models.content.update({_id:options._id},{
                             content:content,
                             date:content_date,
                          },function (err,result) {
                             console.log(result)
                         })
                     }else{
                         models.content.update({_id:options._id},{
                            content:content,
                         })
                     }
                 }
                 break;
        }
    }
});


//分类抓取
// startCrawler.queue({
//     uri:"http://m.hc360.com/info/",
//     type:1 
// })

//抓取内容

// startList()

var start = Date.now();
console.log('当前时间:' + start);

function  startList() {
    models.nav.find({level:2},function (err,result) {
        // setTimeout(console.log(111),60000)
        for(let i=0;i<result.length;i++){
            let modal = {
                uri:result[i].url,
                type:3,
                level_first:result[i]._id.toString(),
                level_second:result[i].parent_id
            }
            searchDetail(modal,i)
        }
    })
}


let totalCount=0

function searchDetail(modal,i) {
    setTimeout(function () {
        models.content.count({},function (err,result) {
           console.log(i,result)
           if(result==totalCount){
               console.log("==============================")
           }
            totalCount= result
        })
        startCrawler.queue(modal)
    },i*1000*10)
}

// startCrawler.queue({
//     uri:'http://m.hc360.com/info-ep/list/001022-001-004-1.html',
//     type:3,
//     level_first:'583d4ef6dfc7aa5088d26206',
//     level_second:'583d4ef5dfc7aa5088d261f0'
// })

//抓取详情
startDetail();
function startDetail() {
    models.content.find({},function (err,result) {
        for(let i=0;i<result.length;i++){
            startCrawler.queue({
                uri:result[i].url,
                _id:result[i]._id,
                type:4
            })
        }
    })
}









