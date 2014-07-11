var express = require('express');
var app = module.exports = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.use(express.static(__dirname + '/../client'));

if (require.main === module) {
  var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
  });
}
