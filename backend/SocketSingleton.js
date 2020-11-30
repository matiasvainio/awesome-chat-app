const socket = require('socket.io');

const SocketSingleton = (function () {
  this.io = null;
  this.configuration = function (server) {
    this.io = socket(server, {
      cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
      },
    });
  };
  return this;
})();

module.exports = SocketSingleton;
