var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Film = new Schema({
    id        : ObjectId,
    title     : { type: String, required: true},
    release   : { type: Number, required: true},
    genre_id  : {type: Schema.ObjectId, ref: 'Genres' }
});

module.exports = mongoose.model('Films', Film);