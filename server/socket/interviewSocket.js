// server/socket/interviewSocket.js

// ==============================
// Interview Socket Events
// ==============================

const interviewSocket = (
  io,
  socket
) => {
  // ==============================
  // Join Interview Room
  // ==============================

  socket.on(
    "joinInterviewRoom",
    (userId) => {
      socket.join(
        `interview-${userId}`
      );

      console.log(
        `User joined interview room: interview-${userId}`
      );
    }
  );

  // ==============================
  // Schedule Interview
  // ==============================

  socket.on(
    "scheduleInterview",
    (data) => {
      io.to(
        `interview-${data.userId}`
      ).emit(
        "interviewScheduled",
        {
          title:
            "Interview Scheduled",
          message: `Your interview is scheduled on ${data.interviewDate}`,
          interview:
            data,
        }
      );
    }
  );

  // ==============================
  // Update Interview Status
  // ==============================

  socket.on(
    "updateInterviewStatus",
    (data) => {
      io.to(
        `interview-${data.userId}`
      ).emit(
        "interviewStatusUpdated",
        {
          title:
            "Interview Status Updated",
          message: `Interview status updated to ${data.status}`,
          interview:
            data,
        }
      );
    }
  );

  // ==============================
  // Cancel Interview
  // ==============================

  socket.on(
    "cancelInterview",
    (data) => {
      io.to(
        `interview-${data.userId}`
      ).emit(
        "interviewCancelled",
        {
          title:
            "Interview Cancelled",
          message:
            "Your interview has been cancelled",
          interview:
            data,
        }
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
        `Interview socket disconnected: ${socket.id}`
      );
    }
  );
};

export default interviewSocket;