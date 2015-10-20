/**
 * Created by ricardomendes on 15/03/15.
 */

var socket;

$(document).ready(function() {

    socket = io.connect('http://localhost:8080/');

    socket.on('connect', function () {
        socket.emit('join', {username: "Consummer2", room: "MAC_1_1"});
    });

    socket.on('update', function (dataSocket) {
        console.log(dataSocket);
    });
});