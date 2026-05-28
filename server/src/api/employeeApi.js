
import API from "./axios";

// ========================================
// GET TASKS
// ========================================

export const getTasks =
  async () => {

    const response =
      await API.get(
        "/employee/tasks"
      );

    return response.data;
  };



// ========================================
// UPDATE TASK STATUS
// ========================================

export const updateTaskStatus =
  async (
    taskId,
    status
  ) => {

    const response =
      await API.put(

        `/employee/tasks/${taskId}`,

        {
          status,
        }
      );

    return response.data;
  };


