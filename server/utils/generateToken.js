// server/utils/generateToken.js

import jwt from "jsonwebtoken";

// ==============================
// Generate JWT Token
// ==============================

const generateToken = (
  userId
) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;