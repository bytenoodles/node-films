var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  
var Greetee;


 
exports.setUp = function(callback) {
    var GreeteeSchema = new Schema({
        name: String
    });
     
    GreeteeSchema.methods.greeting = function() {
        return 'Hello, ' + this.name;
    };
     
    Greetee = mongoose.model('Greetee', GreeteeSchema);


    // connect to a test database and drop all the greetees from it
    mongoose.connect('mongodb://localhost/UnitTest_Greetee');

    Greetee.find(function (err, greetee) {
      if (err) return console.error(err);
    })

    Greetee.remove({}, function(err) {
        callback();
    });


    
};
 
exports.tearDown = function(callback) {
    mongoose.disconnect();
    callback();
};
 
exports.greeting = function(test) {
    test.expect(1);
    var greetee = new Greetee({
        name: 'Pete'
    });
    
    greetee.save(function (err, o) {
        test.expect(err).toBe(null);
        Greetee.findById(o, function (err, doc) {
            test.expect(err).toBe(null);
            console.log(doc); // { name: 'mongodb.org', _id: '50341373e894ad16347efe12' }
        });
    });

    test.equal('Hello, Pete', greetee.greeting());
    test.done();
};