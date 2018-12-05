var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

app.use(express.static('public'));

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

    socket.on('playerAdded', function(data) {
        socket.broadcast.emit('playerAdded',data)
     });

     socket.on('diceRolled', function(data) {
         console.log(data);
        socket.broadcast.emit('diceRolled',data)
     });
 });

http.listen(DEFAULT_PORT, function() {
   console.log('listening on *:'+DEFAULT_PORT);
});
