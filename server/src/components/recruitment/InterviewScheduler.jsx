import { useState } from "react";

const InterviewScheduler = ({
  onSchedule,
}) => {
  const [formData, setFormData] =
    useState({
      date: "",
      time: "",
      mode: "Online",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSchedule(formData);
  };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-5
        "
      >
        Schedule Interview
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="date"
          name="date"
          className="
            w-full
            border
            p-3
            rounded-xl
          "
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          className="
            w-full
            border
            p-3
            rounded-xl
          "
          onChange={handleChange}
          required
        />

        <select
          name="mode"
          className="
            w-full
            border
            p-3
            rounded-xl
          "
          onChange={handleChange}
        >
          <option>
            Online
          </option>

          <option>
            Offline
          </option>
        </select>

        <button
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
          "
        >
          Schedule Interview
        </button>
      </form>
    </div>
  );
};

export default InterviewScheduler;