var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Role = new Schema({
    id        : ObjectId,
    name     : { type: String, required: true }
});

module.exports = mongoose.model('Roles', Role);