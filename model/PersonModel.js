var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Person = new Schema({
    id        : ObjectId,
    lastname  : { type: String, required: true},
    firstname : { type: String, required: true},
    birthDate : Date, 
    castings  : {type: Schema.ObjectId, ref: 'Casts' }
});

module.exports = mongoose.model('Persons', Person);