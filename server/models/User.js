
import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(

    {
      // ========================================
      // BASIC
      // ========================================

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {

        type: String,

        enum: [
          "hr",
          "employee",
          "candidate",
        ],

        default:
          "candidate",
      },

      // ========================================
      // PROFILE
      // ========================================

      phone: {
        type: String,
        default: "",
      },

      department: {
        type: String,
        default: "",
      },

      designation: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        default: "",
      },

      skills: {

        type: [String],

        default: [],
      },

      experience: {
        type: String,
        default: "",
      },

      education: {
        type: String,
        default: "",
      },

      profileImage: {
        type: String,
        default: "",
      },
    },

    {
      timestamps: true,
    }
  );

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;

