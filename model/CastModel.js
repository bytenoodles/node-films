var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Cast = new Schema({
    person_id     : {type: Schema.ObjectId, ref: 'Persons'},
    film_id  : {type: Schema.ObjectId, ref: 'Films'},
    role_id : {type: Schema.ObjectId, ref: 'Roles'}
});

module.exports = mongoose.model('Cast', Cast);