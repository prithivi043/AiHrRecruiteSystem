import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User.js";

// ========================================
// Generate JWT
// ========================================

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ========================================
// Register User
// ========================================

export const registerUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // Check User

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      // Hash Password

      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // Create User

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
          role,
        });

      res.status(201).json({
        message:
          "Registration Successful",

        user,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

// ========================================
// Login User
// ========================================

export const loginUser =
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      // Find User

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(400).json({
          message:
            "Invalid Credentials",
        });
      }

      // Compare Password

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Invalid Credentials",
        });
      }

      // Send Response

      res.status(200).json({
        token: generateToken(
          user._id
        ),

        user: {
          _id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };