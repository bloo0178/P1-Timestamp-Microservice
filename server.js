// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/test', function(req,res) {
  res.json({test: 'hello!!'});
});

/* 
Notes: The question mark in the path signifies an optional parameter "date_string". This
allows for an endpoint that MAY have a value or not. 
*/
app.get('/api/timestamp/:date_string?', function(req,res) {
  if (req.params.date_string == null) {
    res.json({test: 'null'});
  } 
  let date_string = req.params.date_string; 
  if (new Date(date_string) instanceof Date) {
    res.json({test: 'valid'})
  } else {
    res.json({test: 'invalid'});
  }
});


/*
console.clear();

//let date_string = "2015-12-25";
let date_string = "abcd"; // returns invalid date on toUTCString
let date_string2 = 1479663089000;
let test = new Date(date_string);
let test2 = new Date(date_string2);
console.log(new Date(date_string).getMonth());
console.log(test instanceof Date); //returns true or false
console.log((new Date(date_string)) instanceof Date);
console.log(Date.parse(date_string) instanceof Date);
console.log(test.toUTCString());
console.log(test2.toUTCString());
console.log(test2.getTime());
*/



// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

