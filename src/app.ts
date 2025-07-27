import cookieParser from "cookie-parser";
import { Application } from "express";
import express from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import passport from "passport";
import expressSession from "express-session"
import "./app/config/passport";
import { envVars } from "./app/config/env";

const app: Application = express();

// Middleware
app.use(expressSession({
  secret: envVars.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/v1', router)

// test route
app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use(globalErrorHandler) // ✅ Always after routes

// global error handler ar niche
app.use(notFound);

export default app;