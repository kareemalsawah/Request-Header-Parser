var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/')
.get(function(req,res){
  var ip = req.header('x-forwarded-for')||req.connection.remoteAddress;
  ip = ip+'';
  ip = ip.substr(0,ip.indexOf(","));
  var lang = req.headers['accept-language'];
  lang = lang+'';
  lang = lang.substr(0,lang.indexOf(","));
  var software = req.header('user-agent');
  software = software.substr(software.indexOf("(")+1,software.indexOf(")")-software.indexOf("(")-1);
  //console.log(software);
  res.json({ipaddress:ip,language:lang,software:software});
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.get('/', function(request, response) {
  response.render('index.html');
});
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
