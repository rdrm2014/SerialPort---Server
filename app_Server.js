/**
 * Created by ricardomendes on 21/09/15.
 */

var config = require('./config/myConfig.js');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var path = require('path');

require('./sockets/base')(io);

var routes = require('./routes');
//Server IP
app.set("ipaddr", config.myconfig.serverWebSocket.ipaddr);

//Server Port
app.set('port', config.myconfig.serverWebSocket.port);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

server.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});