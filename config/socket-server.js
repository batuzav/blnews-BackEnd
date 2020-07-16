const socketHandler = require("../socketHandler/index");

const startSocketServer = (server) => {
  const io = require("socket.io")(server);
  console.log("SocketServer Started");
  io.on("connection", (socket) => {
    // jwt.verify(authToken, config.jwtSecret, (err, userDtls) => {
    //     if (err) {
    //       // console.log('UNAUTHORIZED token');
    //       socket.disconnect();
    //     } else if (userDtls) {
    //       socket.userId = userDtls._doc._id;
    //       SocketStore.addByUserId(socket.userId, socket);
    //       sockeHandler(socket);         // call socketHandler to handle different socket scenario
    //     }
    //   });

    socketHandler(socket);
  });
};

module.exports = { startSocketServer };
