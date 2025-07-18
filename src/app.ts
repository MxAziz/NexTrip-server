import { Application, } from "express";
import express from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1', router)

// test route
app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use(globalErrorHandler)

export default app;