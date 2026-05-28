// server/socket/notificationSocket.js

// ==============================
// Notification Socket Events
// ==============================

const notificationSocket =
  (
    io,
    socket
  ) => {
    // ==============================
    // Join Notification Room
    // ==============================

    socket.on(
      "joinNotificationRoom",
      (userId) => {
        socket.join(
          `notification-${userId}`
        );

        console.log(
          `User joined notification room: notification-${userId}`
        );
      }
    );

    // ==============================
    // Send Notification
    // ==============================

    socket.on(
      "sendNotification",
      (data) => {
        io.to(
          `notification-${data.userId}`
        ).emit(
          "receiveNotification",
          {
            title:
              data.title,
            message:
              data.message,
            type:
              data.type ||
              "info",
            createdAt:
              new Date(),
          }
        );
      }
    );

    // ==============================
    // Mark Notification As Read
    // ==============================

    socket.on(
      "markNotificationRead",
      (data) => {
        io.to(
          `notification-${data.userId}`
        ).emit(
          "notificationRead",
          {
            notificationId:
              data.notificationId,
          }
        );
      }
    );

    // ==============================
    // Clear Notifications
    // ==============================

    socket.on(
      "clearNotifications",
      (userId) => {
        io.to(
          `notification-${userId}`
        ).emit(
          "notificationsCleared"
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
          `Notification socket disconnected: ${socket.id}`
        );
      }
    );
  };

export default notificationSocket;