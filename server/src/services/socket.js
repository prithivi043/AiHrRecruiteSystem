import { io } from "socket.io-client";

// ========================================
// Backend Socket URL
// ========================================

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  "http://localhost:5000";

// ========================================
// Create Socket Connection
// ========================================

const socket = io(
  SOCKET_URL,
  {
    autoConnect: false,

    reconnection: true,

    reconnectionAttempts: 5,

    reconnectionDelay: 2000,

    transports: ["websocket"],
  }
);

// ========================================
// Connect Socket
// ========================================

export const connectSocket =
  () => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) return;

    socket.auth = {
      token,
    };

    socket.connect();
  };

// ========================================
// Disconnect Socket
// ========================================

export const disconnectSocket =
  () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

// ========================================
// Socket Events
// ========================================

socket.on("connect", () => {
  console.log(
    "Socket Connected:",
    socket.id
  );
});

socket.on("disconnect", () => {
  console.log(
    "Socket Disconnected"
  );
});

socket.on(
  "connect_error",
  (error) => {
    console.log(
      "Socket Error:",
      error.message
    );
  }
);

export default socket;