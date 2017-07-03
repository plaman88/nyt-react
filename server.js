// dependencies 
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Article = require('./models/Article.js');

var app = express();
var PORT = process.env.PORT || 8080;
var path = require('path');
// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use('/public', express.static('./public'));

// mongo db connection here 

mongoose.connect('mongodb://localhost/nytreact');

var db = mongoose.connection;

// var uri = "mongodb://heroku_pzv76wlj:HpuyURKvitaJpZGO_4YxSPxtXNUMbOqo.mlab.com:61551/heroku_pzv76wlj";

// // heroku connect
// mongoose.connect(uri);


db.on("error", function(err){
  console.log("Mongoosey error: ", err);
});

db.once("open", function(){
  console.log("Mongoose connection success my friend "  );

});

app.get("/", function(req, res){
  console.log(path.join(__dirname, "public/index.html"));
  res.sendFile(path.join(__dirname, "public/index.html"));

})

app.get("/api/saved", function(req, res){
	
	Article.find({})
	.exec(function(err, doc){
		if(err){
			console.log(err);

		}
		else {
			res.send(doc);
		}
	})
});

app.post('/api/saved', function(req, res){

  var newArticle = new Article({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });

});

app.delete('/api/saved/:id', function(req, res){

  Article.find({'_id': req.params.id}).remove()
    .exec(function(err, doc) {
      res.send(doc);
  });

});


app.listen(PORT, function() {
  console.log("App listening on PORT 8080 Davey: " + PORT);
});








