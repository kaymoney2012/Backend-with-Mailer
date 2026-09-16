import express from "express";
import cors from "cors";
import newUserRouter from "./routes/newUserRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/new-user", newUserRouter);

export default app;
