
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/api.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {layout: false});
  app.set('jsonp callback', true);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'thisismarkdownyo' }));
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
app.get('/', routes.goHome);
app.get('/markdown.jsonp', routes.get) //SOME MAGIC
app.get('/:any', routes.goHome);

app.post('/', routes.badRequest);
app.post('/markdown.:format', routes.post); //SOME MORE MAGIC
app.post('/:any', routes.badRequest);



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
