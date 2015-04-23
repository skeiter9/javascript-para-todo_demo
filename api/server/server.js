var loopback = require('loopback');
var boot = require('loopback-boot');

var server = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.

boot(server, __dirname);

server.start = function() {
  // start the web server
  return server.listen(function() {
    server.emit('started');
    console.log('Web server listening at: %s', server.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {

  server.io = require('socket.io')(server.start());

  server.io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('launch', 'from server');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
  });

}
