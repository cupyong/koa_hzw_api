'use strict';

module.exports={
    port: process.env.PORT || 9009,
    mongo: {
        options: {
            db: {
                safe: true
            }
        },
        uri: 'mongodb://localhost/test'
    },
    //redis 配置
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
    //是否初始化数据
    seedDB: false,
}