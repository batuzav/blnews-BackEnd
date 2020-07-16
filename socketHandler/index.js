const socketHandler = (socket) => {
  socket.on("hello", () => {
    socket.emit("helloResponse", "hello everyone");
  });

  socket.on("disconnect", () => {
    socket.emit("bye", "see you spacecowboy");
  });
};

module.exports = socketHandler;
