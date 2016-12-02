/**
 * 内容
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ContentSchema  = new Schema({
    content_id:{
        type: Schema.Types.ObjectId
    },
    title:String,
    url:String,
    images:Array,
    content:String,
    date:String,
    introduction:String,
    level_first:String,
    level_second:String,
    content_date:Date
})
module.exports = mongoose.model('content',ContentSchema);