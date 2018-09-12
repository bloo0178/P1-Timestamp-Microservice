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

/* Used to test values for acceptable format to parse into a Date object */
let dateTest = function(d) {
  if (Object.prototype.toString.call(d) === "[object Date]") {
    // it is a date
    if (isNaN(d.getTime())) {
      // d.valueOf() could also work
      return false; // date is not valid
    } else {
      return true; // date is valid
    }
  } else {
    return false; // not a date
  }
};

/* 
Notes: The question mark in the path signifies an optional parameter "date_string". This
allows for an endpoint that MAY have a value or not. 
*/

app.get('/api/timestamp/:date_string?', function(req,res) {
  
  //Check to see if no date was specified
  if (req.params.date_string == null) {
    res.json({date: new Date()}); //Date.now()?
  } 
  
  //Format date_string in URI into variable based on integer or date format
  if (isNaN(req.params.date_string)) { 
    var date_string = new Date(req.params.date_string);
    } else {
  var date_string = new Date(parseInt(req.params.date_string) * 1000);
    };
  
  // Test whether format in URI is valid or not
  if (dateTest(date_string)) { //valid
    res.json({unix: date_string.getTime(), utc : date_string.toUTCString()});
  } else { //invalid
    res.json({error : "Invalid Date"});
  }
});


// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

