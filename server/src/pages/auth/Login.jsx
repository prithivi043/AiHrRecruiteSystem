import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  loginUser,
} from "../../api/authApi";

const Login = () => {
  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
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
          await loginUser(
            formData
          );

        alert(
          "Login Successful"
        );

        // Navigate Based On Role

        if (
          data.user.role ===
          "hr"
        ) {
          navigate("/hr");

        } else if (
          data.user.role ===
          "employee"
        ) {
          navigate(
            "/employee"
          );

        } else {
          navigate(
            "/candidate"
          );
        }

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
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
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
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

        <p
          className="
            text-center
            mt-5
          "
        >
          Don't have account?

          <Link
            to="/register"
            className="
              text-blue-600
              ml-2
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;