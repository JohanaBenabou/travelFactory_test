import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { AppDataSource } from "./config/data-source";

import vacationRoutes from "./routes/vacationRoutes";

dotenv.config();
console.log(process.env.DB_PASSWORD);

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/vacations", vacationRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error: unknown) => {
    console.log(error);
  });