// server/socket/taskSocket.js

// ==============================
// Task Socket Events
// ==============================

const taskSocket = (
  io,
  socket
) => {
  // ==============================
  // Join Task Room
  // ==============================

  socket.on(
    "joinTaskRoom",
    (userId) => {
      socket.join(
        `task-${userId}`
      );

      console.log(
        `User joined task room: task-${userId}`
      );
    }
  );

  // ==============================
  // New Task Assigned
  // ==============================

  socket.on(
    "assignTask",
    (data) => {
      io.to(
        `task-${data.userId}`
      ).emit(
        "taskAssigned",
        {
          title:
            "New Task Assigned",
          message: `You have been assigned a new task: ${data.taskTitle}`,
          task: data,
        }
      );
    }
  );

  // ==============================
  // Update Task Status
  // ==============================

  socket.on(
    "updateTaskStatus",
    (data) => {
      io.to(
        `task-${data.userId}`
      ).emit(
        "taskStatusUpdated",
        {
          title:
            "Task Status Updated",
          message: `Task status changed to ${data.status}`,
          task: data,
        }
      );
    }
  );

  // ==============================
  // Delete Task
  // ==============================

  socket.on(
    "deleteTask",
    (data) => {
      io.to(
        `task-${data.userId}`
      ).emit(
        "taskDeleted",
        {
          title:
            "Task Deleted",
          message:
            "A task has been removed",
          taskId:
            data.taskId,
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
        `Task socket disconnected: ${socket.id}`
      );
    }
  );
};

export default taskSocket;