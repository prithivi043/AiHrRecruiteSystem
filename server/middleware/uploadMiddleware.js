import multer from "multer";

import path from "path";

// ========================================
// STORAGE
// ========================================

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        "uploads/"
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        Date.now() +
          path.extname(
            file.originalname
          )
      );
    },
  });

// ========================================
// FILE FILTER
// ========================================

const fileFilter = (
  req,
  file,
  cb
) => {
  console.log(
    "FILE:",
    file.originalname
  );

  console.log(
    "MIME:",
    file.mimetype
  );

  // ======================================
  // ALLOWED EXTENSIONS
  // ======================================

  const allowedExtensions =
    [
      ".pdf",
      ".doc",
      ".docx",
      ".txt",
      ".png",
      ".jpg",
      ".jpeg",
    ];

  // ======================================
  // GET FILE EXTENSION
  // ======================================

  const ext =
    path
      .extname(
        file.originalname
      )
      .toLowerCase();

  // ======================================
  // VALIDATE
  // ======================================

  if (
    allowedExtensions.includes(
      ext
    )
  ) {
    cb(null, true);

  } else {
    cb(
      new Error(
        "Only resume files allowed (PDF, DOC, DOCX, TXT, PNG, JPG)"
      )
    );
  }
};

// ========================================
// UPLOAD
// ========================================

const upload = multer({
  storage,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;