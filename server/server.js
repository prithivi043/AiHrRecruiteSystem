import dotenv from "dotenv";

import path from "path";

// ========================================
// LOAD ENV
// ========================================

dotenv.config();

import express from "express";

import cors from "cors";

import connectDB from "./config/db.js";

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
// CORS
// ========================================


const allowedOrigins = [

  "http://localhost:5173",

  "https://ai-hr-recruite-system-t9mr.vercel.app",
];



app.use(

  cors({

    origin: function (
      origin,
      callback
    ) {

      // ALLOW NO ORIGIN
      // (POSTMAN / MOBILE)

      if (!origin) {

        return callback(
          null,
          true
        );
      }

      // CHECK ORIGIN

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

// HANDLE PREFLIGHT

app.options("*", cors());





app.use(express.json());

app.use(

  express.urlencoded({

    extended: true,
  })
);






app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ========================================
// STATIC UPLOADS
// ========================================

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

app.use(
  "/uploads",
  express.static("uploads")
);

// ========================================
// ROUTES
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
// PORT
// ========================================

const PORT =
  process.env.PORT || 5000;

// ========================================
// SERVER
// ========================================

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});