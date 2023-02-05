import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middlewares/Error.js";

dotenv.config({
  path: "./config/config.env"
})

const app = express()

// Using middlewares

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cookieParser());

// Importing & using routes

import courses from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", courses);
app.use("/api/v1", user);

export default app;

app.use(ErrorMiddleware);