var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Contact = new Schema({
    person_id     : {type: Schema.ObjectId, ref: 'Persons', index: { unique: true, sparse: true } },
    phone  : { type: String, required: false, uppercase: true, trim: true},
    email : { type: String, required: false},
    address      : { type: String, required: false, trim: true, index: { unique: true, sparse: true } },
});

module.exports = mongoose.model('Contact', Contact);