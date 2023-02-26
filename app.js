import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middlewares/Error.js";
import cors from "cors";

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
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}))

// Importing & using routes

import courses from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";

app.use("/api/v1", courses);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

export default app;

app.get("/", (req, res) => {
  res.send(`<h1>Working pretty fine, click <a href=${process.env.FRONTEND_URL}>here</a> to visit front-end.</h1>`)
})

app.use(ErrorMiddleware);