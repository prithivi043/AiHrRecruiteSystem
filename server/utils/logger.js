// server/utils/logger.js

// ==============================
// Logger Utility
// ==============================

const getTimeStamp = () => {
  return new Date().toLocaleString(
    "en-IN",
    {
      dateStyle:
        "medium",
      timeStyle:
        "medium",
    }
  );
};

// ==============================
// Success Logger
// ==============================

export const logSuccess =
  (message) => {
    console.log(
      `✅ [SUCCESS] ${getTimeStamp()} - ${message}`
    );
  };

// ==============================
// Error Logger
// ==============================

export const logError = (
  message
) => {
  console.error(
    `❌ [ERROR] ${getTimeStamp()} - ${message}`
  );
};

// ==============================
// Warning Logger
// ==============================

export const logWarning =
  (message) => {
    console.warn(
      `⚠️ [WARNING] ${getTimeStamp()} - ${message}`
    );
  };

// ==============================
// Info Logger
// ==============================

export const logInfo = (
  message
) => {
  console.info(
    `ℹ️ [INFO] ${getTimeStamp()} - ${message}`
  );
};

// ==============================
// Request Logger
// ==============================

export const logRequest =
  (
    method,
    url
  ) => {
    console.log(
      `📡 [REQUEST] ${getTimeStamp()} - ${method} ${url}`
    );
  };

// ==============================
// Database Logger
// ==============================

export const logDatabase =
  (message) => {
    console.log(
      `🗄️ [DATABASE] ${getTimeStamp()} - ${message}`
    );
  };

// ==============================
// Socket Logger
// ==============================

export const logSocket =
  (message) => {
    console.log(
      `🔌 [SOCKET] ${getTimeStamp()} - ${message}`
    );
  };