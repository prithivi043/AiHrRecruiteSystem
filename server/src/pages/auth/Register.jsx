import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  registerUser,
} from "../../api/authApi";

const Register = () => {
  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "candidate",
    });

  // ========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // ========================================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const data =
          await registerUser(
            formData
          );

        alert(
          data.message
        );

        navigate("/login");

      } catch (error) {
        alert(
          error.message
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        p-4
      "
    >
      <div
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-full
          max-w-md
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-center
            text-blue-600
            mb-6
          "
        >
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name */}

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />

          {/* Password */}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />

          {/* Role */}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          >
            <option value="candidate">
              Candidate
            </option>

            <option value="employee">
              Employee
            </option>

            <option value="hr">
              HR Manager
            </option>
          </select>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
            "
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        <p
          className="
            text-center
            mt-5
          "
        >
          Already have account?

          <Link
            to="/login"
            className="
              text-blue-600
              ml-2
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;