/*!
* Demo registration application
* Copyright(c) 2011 Jean-Tiare LE BIGOT <admin@jtlebi.fr>
* MIT Licensed
*/


/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/list', routes.list);
app.get('/csv', routes.csv);
app.post('/', routes.index_post);

app.get('/genres', routes.genres);
app.post('/genres', routes.genres_post);
app.post('/genre_list', routes.genre_list);

app.post('/action', routes.action);

// Open App socket
app.listen(3003);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);