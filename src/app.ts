import { Application } from "express";
import express from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRoutes)

// test route
app.get("/", (req, res) => {
  res.send("Api is running");
});

export default app;