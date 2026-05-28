// server/config/socket.js

import { Server } from "socket.io";

let io;

// ==============================
// Initialize Socket.IO
// ==============================

export const initSocket = (
  server
) => {
  io = new Server(server, {
    cors: {
      origin:
        process.env.CLIENT_URL,
      methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
      ],
      credentials: true,
    },
  });

  io.on(
    "connection",
    (socket) => {
      console.log(
        `Socket Connected: ${socket.id}`
      );

      // Join Role Room

      socket.on(
        "joinRoom",
        (room) => {
          socket.join(room);

          console.log(
            `User joined room: ${room}`
          );
        }
      );

      // Disconnect

      socket.on(
        "disconnect",
        () => {
          console.log(
            `Socket Disconnected: ${socket.id}`
          );
        }
      );
    }
  );

  return io;
};

// ==============================
// Get Socket Instance
// ==============================

export const getIO =
  () => {
    if (!io) {
      throw new Error(
        "Socket.IO not initialized"
      );
    }

    return io;
  };