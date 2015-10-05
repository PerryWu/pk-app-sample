/*
 * Copyright (c) 2015 PillaKloud
 * All the rights are reserved by PillaKloud.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

app.set('view engine', 'html');

console.log('pkRoot: ' + process.env.PKROOT);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(logger(':method :url'));
app.use(methodOverride('_method'));
app.use(cookieParser('pk'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(session({
	resave: false, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	secret: 'pk, very secret'
}));

app.get('/', function(req, res) {
	res.redirect('index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == process.env.ENV) {
	app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
