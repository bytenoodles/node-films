/*!
* Demo registration application
* Copyright(c) 2011 Jean-Tiare LE BIGOT <admin@jtlebi.fr>
* MIT Licensed
*/

// loads model file and engine
var mongoose    = require('mongoose'),
    castModel = require('../model/CastModel'),
    contactModel = require('../model/ContactModel'),
    filmModel = require('../model/FilmModel'),
    genreModel = require('../model/GenreModel'),
    personModel = require('../model/PersonModel'),
    roleModel = require('../model/RoleModel');

// Open DB connection
mongoose.connect('mongodb://localhost/films');

// Home page => registration form
exports.index = function(req, res){
    res.render('index.jade', { title: 'ByteFilms - Index', messages: [], errors: [], layout: false});
};

// Member list page
exports.list = function(req, res){
    memberModel.find({},function(err, docs){
        res.render('list.jade', { title: 'ByteFilms - List', members: docs, layout: false});
    });
};

// Member list quick-and-dirty(tm) CSV export
exports.csv = function(req, res){
    memberModel.find({},function(err, docs){
        members = new Array();
        str = "";
        docs.forEach(function (member) {
            str += member.title;
            str += "; " + member.firstname;
            str += "; " + member.lastname;
            str += "; " + member.mail;
            str += "; " + member.date;
            str += "\n";
        });
        res.header('Content-type', 'text/csv');
        res.send(str);
    });
};

// Member register logic
exports.index_post = function(req, res){
    member = new memberModel();
    member.title = req.body.title;
    member.firstname = req.body.firstname;
    member.lastname = req.body.lastname;
    member.mail = req.body.mail;
    
    member.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
            messages.push("Thank you for you new membership !");
        }
        else {
            console.log('Error !');
            errors.push("At least a mandatory field has not passed validation...");
            console.log(err);
        }
        res.render('index.jade', { title: 'ByteFilms - Index', messages: messages, errors: errors, layout: false});
    });
};

exports.genres = function(req, res){    
    var entity = mongoose.model('Genre');
    debugger;
    res.render('list.jade', { title: 'ByteFilms - List', layout: false, entity: entity});
};

exports.genre_list = function(req, res){    
    genreModel.find({},function(err, docs){
        res.send(docs);
    });
};

exports.action = function(req, res){
    var accion = req.body.accion;

    switch(accion){
        case "I": // Insert
            
            var Entity = mongoose.model(req.body.modelName);
            var obj = new Entity();
            var doc = req.body.doc;
            debugger;
            for(var prop in Entity.schema.paths){
                if (!(/^_/).test(prop)){
                    obj[prop] = doc[prop];
                    debugger;
                }
            }
            debugger;
            obj.save(function (err) {
                messages = [];
                errors = [];
                if (!err){
                    console.log('Success!');
                    messages.push("A new " + Entity.modelName + " was created successfully");
                }
                else {
                    console.log('Error !');
                    errors.push("At least a mandatory field has not passed validation...");
                    console.log(err);
                }
            });
        break;
        case "U": // Update

        break;
        case "D": // Delete
            var Entity = mongoose.model(req.body.modelName);
            Entity.remove({ _id: req.body.doc._id }, function (err) {
              if (err) return handleError(err);
              // removed!
            });
        break;
        default:
            console.log('Error ! No proper action was retrieved: "' + accion + '"');
            errors.push('Error ! No proper action was retrieved: "' + accion + '"');
        break;
    }
    res.send({});
};