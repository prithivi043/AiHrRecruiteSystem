// server/socket/socketHandler.js

import notificationSocket from "./notificationSocket.js";

import taskSocket from "./taskSocket.js";

import interviewSocket from "./interviewSocket.js";

// ==============================
// Main Socket Handler
// ==============================

const socketHandler = (
  io
) => {
  io.on(
    "connection",
    (socket) => {
      console.log(
        `Socket connected: ${socket.id}`
      );

      // ==============================
      // Register Socket Modules
      // ==============================

      notificationSocket(
        io,
        socket
      );

      taskSocket(
        io,
        socket
      );

      interviewSocket(
        io,
        socket
      );

      // ==============================
      // Join Custom Room
      // ==============================

      socket.on(
        "joinRoom",
        (room) => {
          socket.join(
            room
          );

          console.log(
            `Socket joined room: ${room}`
          );
        }
      );

      // ==============================
      // Leave Room
      // ==============================

      socket.on(
        "leaveRoom",
        (room) => {
          socket.leave(
            room
          );

          console.log(
            `Socket left room: ${room}`
          );
        }
      );

      // ==============================
      // Disconnect
      // ==============================

      socket.on(
        "disconnect",
        () => {
          console.log(
            `Socket disconnected: ${socket.id}`
          );
        }
      );
    }
  );
};

export default socketHandler;