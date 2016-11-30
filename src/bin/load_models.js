//加载models
'use strict';
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect(config.mongo.uri, config.mongo.options);

let models={};

let dir = fs.readdirSync(__dirname + '/../models');

let toCamel = function (name) {
    var newName = '';
    var underline = false;
    for (var i = 0; i < name.length; i++) {
        if (name[i] === '_' || name[i] === '-') {
            underline = true;
        } else {
            newName += underline ? name[i].toUpperCase() : name[i];
            underline = false;
        }
    };
    return newName;
};
for (let i = 0; i < dir.length; i++) {
    if (path.extname(dir[i]) !== '.js') continue;
    require(__dirname + '/../models/' + dir[i]);
    models[toCamel(path.basename(dir[i], '.js'))]=mongoose.model(toCamel(path.basename(dir[i], '.js')));
}
module.exports = models;
