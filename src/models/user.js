/**
 * 用户
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
    },
    name:String
})
module.exports = mongoose.model('user',UserSchema);
