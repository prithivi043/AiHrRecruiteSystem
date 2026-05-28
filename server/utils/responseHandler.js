// server/utils/responseHandler.js

// ==============================
// Success Response
// ==============================

export const successResponse =
  (
    res,
    message =
      "Success",
    data = null,
    statusCode = 200
  ) => {
    return res.status(
      statusCode
    ).json({
      success: true,
      message,
      data,
    });
  };

// ==============================
// Error Response
// ==============================

export const errorResponse =
  (
    res,
    message =
      "Something went wrong",
    statusCode = 500,
    error = null
  ) => {
    return res.status(
      statusCode
    ).json({
      success: false,
      message,
      error,
    });
  };

// ==============================
// Validation Error Response
// ==============================

export const validationErrorResponse =
  (
    res,
    errors = []
  ) => {
    return res.status(
      400
    ).json({
      success: false,
      message:
        "Validation failed",
      errors,
    });
  };

// ==============================
// Unauthorized Response
// ==============================

export const unauthorizedResponse =
  (
    res,
    message =
      "Unauthorized access"
  ) => {
    return res.status(
      401
    ).json({
      success: false,
      message,
    });
  };

// ==============================
// Forbidden Response
// ==============================

export const forbiddenResponse =
  (
    res,
    message =
      "Access forbidden"
  ) => {
    return res.status(
      403
    ).json({
      success: false,
      message,
    });
  };

// ==============================
// Not Found Response
// ==============================

export const notFoundResponse =
  (
    res,
    message =
      "Resource not found"
  ) => {
    return res.status(
      404
    ).json({
      success: false,
      message,
    });
  };