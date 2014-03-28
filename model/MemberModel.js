var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var MemberSchema = new Schema({
    id        : ObjectId,
    title     : { type: String, required: true, enum: ['Mr', 'Mrs', 'Mme', 'Miss'] },
    lastname  : { type: String, required: true, uppercase: true, trim: true},
    firstname : { type: String, required: true},
    mail      : { type: String, required: true, trim: true, index: { unique: true, sparse: true } },
    date      : Date
});

MemberSchema.path('date')
.default(function(){
    return new Date()
})
.set(function(v){
    return v == 'now' ? new Date() : v;
});

module.exports = mongoose.model('Members', MemberSchema);