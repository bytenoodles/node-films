var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Role = new Schema({
    name     : { type: String, required: true }
});

module.exports = mongoose.model('Role', Role);