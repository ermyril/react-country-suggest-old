var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})
app.get('/dist/app.js', function (req, res) {
  res.sendFile(__dirname + '/dist/app.js');
});
app.get('/dist/app.css', function (req, res) {
  res.sendFile(__dirname + '/dist/app.css');
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});



