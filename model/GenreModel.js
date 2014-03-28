var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Genre = new Schema({
    name     : { type: String, required: true }
});

module.exports = mongoose.model('Genre', Genre);