module.exports = function (io) {
    'use strict';

    var usernames = {};

    /**
     * Permissões; Lista
     * Join (unico)
     *
     *
     */

    io.sockets.on('connection',
        /**
         * Permite conectar um novo cliente a um canal
         *
         * *Exemplo:*
         *      var socket = io.connect('http://192.168.160.98:8080');
         *
         * @param      {String}   socket Endereço do Servidor
         * @return     {Array} an array of string path
         */
        function connect(socket) {
            socket.on('join',
                /**
                 * Permite adicionar um novo cliente a um canal
                 *
                 * *Exemplo:*
                 *      socket.emit('join', "Publisher", "Channel");
                 *
                 * @param      {String}   username Nome do utilizador
                 * @param      {String}   channel Nome do canal
                 * @return     {Array} an array of string path
                 */
                function join(data) {

                    // Confirmação de Token e User
                    if (checkUser(data.username,data.token,data.channelReceive,data.channelSend)) {

                        socket.username = data.username;
                        console.log(data);

                        if (data.channelReceive) {
                            socket.channelReceive = data.channelReceive;
                            socket.join(socket.channelReceive);
                        }
                        if (data.channelSend) {
                            socket.channelSend = data.channelSend;
                            socket.join(socket.channelSend);
                        }
                    }
                });

            socket.on('send',
                /**
                 * Permite enviar dados através de um canal
                 *
                 * *Exemplo:*
                 *      socket.emit('send', {'DATA':'exampleData'});
                 *
                 * @param      {Object}   data Nome do utilizador
                 * @return     {Array} an array of string path
                 */
                function send(data) {
                    io.sockets.in(socket.channelSend).emit('update', {username: socket.username, data: data});
                });

            socket.on('switchChannel',
                /**
                 * Permite mudar de canal
                 *
                 * *Exemplo:*
                 *      socket.emit('switchChannel', 'newChannel');
                 *
                 * @param      {String}   newchannel Nome do canal
                 * @return     {Array} an array of string path
                 */
                function switchChannel(newchannel) {
                    socket.leave(socket.channel);
                    socket.join(newchannel);
                    socket.channel = newchannel;
                });

            socket.on('disconnect',
                /**
                 * Permite adicionar um novo cliente a um canal
                 *
                 * *Exemplos:*
                 *      socket.emit('disconnect');
                 *
                 */
                function disconnect() {
                    /*delete usernames[socket.username];
                    io.sockets.emit('updateusers', usernames);
                    socket.leave(socket.channel);*/
                });
        });

};

function checkUser(username,token, channelReceive, channelSend){
    return (username==username && token==token && channelReceive==channelReceive && channelSend==channelSend);
}


