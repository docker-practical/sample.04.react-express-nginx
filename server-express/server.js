console.log('Server are running');

// This is a minimalist web-framework for NodeJS
var express = require('express');

// This is parse middleware, that helps parsing incoming requests' body
var bodyParser = require('body-parser');

// Cookie middleware
var cookieParser = require('cookie-parser');

// Handle session
var session = require('express-session');

// Log useful info in commandline about request
var morgan = require('morgan');

// Init express
var app = express();

// Set the initial port of backend app
app.set('port', 9000);

// In !Development! mode we can set to log the request
app.use(morgan('dev'));

// body.parser init, it will parse the incoming parameters into req body
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

var handleFn = (req, res, next) => {
    next();
};

// Init route
app.get('/', handleFn, (req, res) => {
    res.redirect('/api');
});

// Api route
app.route('/api').get(handleFn, (req, res) => {
    res.sendFile(__dirname + '/public/api.html');
});

// Car list
app.route('/api/cars').get(handleFn, (req, res) => {
    res.sendFile(__dirname + '/public/cars.json');
});

// Route for handling 404
app.use(function(req, res, next) {
    res.status(404).send('Sorry can\'t find that!');
});

// 500 error
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Somthing failded!'});
    } else {
        next(err);
    }
}

app.use(clientErrorHandler);

// start server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

