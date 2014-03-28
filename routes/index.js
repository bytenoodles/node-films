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

var hashModels = [];
hashModels['Cast'] = castModel;
hashModels['Contact'] = contactModel;
hashModels['Film'] = filmModel;
hashModels['Genre'] = genreModel;
hashModels['Person'] = personModel;
hashModels['Role'] = roleModel;

// Open DB connection
mongoose.connect('mongodb://localhost/films');

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

exports.index = function(req, res){
    if(req.query.model != "" && typeof hashModels[req.query.model] !== "undefined"){
        var model = null;
        model = mongoose.model(req.query.model);
        debugger;
        res.render('list.jade', { title: 'ByteFilms - List', layout: false, model: model});
    }else{
        // Show index
        res.render('index.jade', { title: 'ByteFilms - List', layout: false, errors: [], messages: []});
    }
};

exports.list = function(req, res){
    if(req.body.model != "" && typeof hashModels[req.body.model] !== "undefined"){
        hashModels[req.body.model].find({},function(err, docs){
            res.send(docs);
        });
    }else{
        res.send({});
    }
};

exports.action = function(req, res){
    var accion = req.body.accion;

    switch(accion){
        case "I": // Insert
            
            var model = mongoose.model(req.body.modelName);
            var obj = new model();
            var doc = req.body.doc;
            for(var prop in model.schema.paths){
                if (!(/^_/).test(prop)){
                    obj[prop] = doc[prop];
                }
            }
            obj.save(function (err) {
                messages = [];
                errors = [];
                if (!err){
                    console.log('Success!');
                    messages.push("A new " + model.modelName + " was created successfully");
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
            var model = mongoose.model(req.body.modelName);
            model.remove({ _id: req.body.doc._id }, function (err) {
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