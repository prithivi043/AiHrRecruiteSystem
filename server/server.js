
import dotenv from "dotenv";

import path from "path";

import express from "express";

import cors from "cors";

// ========================================
// LOAD ENV
// ========================================

dotenv.config();

// ========================================
// DATABASE
// ========================================

import connectDB from "./config/db.js";

// ========================================
// ROUTES
// ========================================

import authRoutes from "./routes/authRoutes.js";

import hrRoutes from "./routes/hrRoutes.js";

import candidateRoutes from "./routes/candidateRoutes.js";

import employeeRoutes from "./routes/employeeRoutes.js";

// ========================================
// CONNECT DATABASE
// ========================================

connectDB();

// ========================================
// APP
// ========================================

const app = express();

// ========================================
// CORS CONFIG
// ========================================

const allowedOrigins = [

  "https://ai-hr-recruite-system-t9mr.vercel.app",
];

app.use(

  cors({

    origin: function (
      origin,
      callback
    ) {

      // ALLOW POSTMAN / MOBILE

      if (!origin) {

        return callback(
          null,
          true
        );
      }

      // CHECK FRONTEND URL

      if (
        allowedOrigins.includes(
          origin
        )
      ) {

        callback(
          null,
          true
        );

      } else {

        callback(

          new Error(
            "CORS Not Allowed"
          )
        );
      }
    },

    credentials: true,

    methods: [

      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [

      "Content-Type",
      "Authorization",
    ],
  })
);

// ========================================
// HANDLE PREFLIGHT
// ========================================

app.options("*", cors());

// ========================================
// BODY PARSER
// ========================================

app.use(express.json());

app.use(

  express.urlencoded({

    extended: true,
  })
);

// ========================================
// STATIC UPLOADS
// ========================================

app.use(

  "/uploads",

  express.static(

    path.join(

      process.cwd(),

      "uploads"
    )
  )
);

// ========================================
// API ROUTES
// ========================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/hr",
  hrRoutes
);

app.use(
  "/api/candidate",
  candidateRoutes
);

app.use(
  "/api/employee",
  employeeRoutes
);

// ========================================
// DEFAULT ROUTE
// ========================================

app.get("/", (req, res) => {

  res.send(
    "AI HR Platform API Running"
  );
});

// ========================================
// EXPORT APP
// ========================================

export default app;

