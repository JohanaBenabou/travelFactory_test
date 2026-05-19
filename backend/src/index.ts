import dotenv from "dotenv";

dotenv.config();

import express from "express";

import "reflect-metadata";

import { AppDataSource } from "./config/data-source";

import vacationRoutes from "./routes/vacationRoutes";

import authRoutes from "./routes/authRoutes";

import {
  errorMiddleware,
} from "./middleware/errorMiddleware";

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {

  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {

    console.log(
      "OPTIONS REQUEST OK"
    );

    return res.sendStatus(200);
  }

  next();
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/vacations",
  vacationRoutes
);
app.use(
  errorMiddleware
);

AppDataSource.initialize()

  .then(() => {

    console.log(
      "Database connected"
    );

    app.listen(
  Number(process.env.PORT),
      () => {

        console.log(
          "Server running on port 5000"
        );
      }
    );
  })

  .catch((error) => {

    console.log(
      "DATABASE ERROR:"
    );

    console.log(error);
  });