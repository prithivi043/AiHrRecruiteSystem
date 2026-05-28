
import {
  useState,
} from "react";

import {
  assignTask,
} from "../../api/hrApi";

const AssignTaskForm =
  ({
    employees = [],
  }) => {

    const [loading,
      setLoading] =
      useState(false);

    const [formData,
      setFormData] =
      useState({

        employee: "",

        title: "",

        description: "",

        priority: "Medium",

        deadline: "",
      });

    // ========================================
    // HANDLE CHANGE
    // ========================================

    const handleChange =
      (e) => {

        setFormData({

          ...formData,

          [e.target.name]:
            e.target.value,
        });
      };

    // ========================================
    // SUBMIT
    // ========================================

    const handleSubmit =
      async (e) => {

        e.preventDefault();

        try {

          setLoading(true);

          await assignTask(
            formData
          );

          alert(
            "Task Assigned Successfully"
          );

          setFormData({

            employee: "",

            title: "",

            description: "",

            priority: "Medium",

            deadline: "",
          });

        } catch (error) {

          console.log(error);

          alert(
            "Failed to assign task"
          );

        } finally {

          setLoading(false);
        }
      };

    return (

      <div
        className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
        "
      >

        {/* HEADER */}

        <div className="mb-6">

          <h2
            className="
              text-2xl
              font-bold
              text-gray-800
            "
          >
            Assign Task
          </h2>

          <p className="text-gray-500">
            Assign tasks to employees
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          {/* EMPLOYEE */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-600
                mb-2
              "
            >
              Select Employee
            </label>

            <select
              name="employee"
              value={
                formData.employee
              }
              onChange={
                handleChange
              }
              required
              className="
                w-full
                border
                border-gray-200
                p-4
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="">
                Select Employee
              </option>

              {employees.map(
                (employee) => (

                  <option
                    key={
                      employee._id
                    }
                    value={
                      employee._id
                    }
                  >
                    {employee.name}
                    {" - "}
                    {employee.email}
                  </option>
                )
              )}

            </select>

          </div>

          {/* TITLE */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-600
                mb-2
              "
            >
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              placeholder="Enter task title"
              required
              className="
                w-full
                border
                border-gray-200
                p-4
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-600
                mb-2
              "
            >
              Task Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              placeholder="Enter task details"
              required
              className="
                w-full
                border
                border-gray-200
                p-4
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* PRIORITY */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-600
                mb-2
              "
            >
              Priority
            </label>

            <select
              name="priority"
              value={
                formData.priority
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                border-gray-200
                p-4
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>

            </select>

          </div>

          {/* DEADLINE */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-600
                mb-2
              "
            >
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={
                formData.deadline
              }
              onChange={
                handleChange
              }
              required
              className="
                w-full
                border
                border-gray-200
                p-4
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-700
              hover:scale-[1.01]
              transition
              text-white
              py-4
              rounded-2xl
              font-semibold
              shadow-lg
            "
          >

            {loading
              ? "Assigning Task..."
              : "Assign Task"}

          </button>

        </form>

      </div>
    );
};

export default AssignTaskForm;

