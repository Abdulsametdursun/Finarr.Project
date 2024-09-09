import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import gigRouter from "./routes/gig.routes.js";
import reviewRouter from "./routes/review.routes.js";
import cookieParser from "cookie-parser";

// getting data from env file
dotenv.config();

// connect to the database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("👽 Connected to the Database 😁"))
  .catch((err) =>
    console.log("🚩 There is an error while connection to the database 🙃", err)
  );

// create a express app
const app = express();

// middlewares
// 1) to use the json data in body/query
app.use(express.json());

// 2) Add headers to obstruct CORS warnings
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// 3) to print results
app.use(morgan("dev"));

// 4) use cookies coming from get request
app.use(cookieParser());

// Control routes
app.route("/health").get((req, res) => {
  res.end("Server is running...");
});

// set routes
app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRouter);
app.use("/api/review", reviewRouter);

// Middlewares for errors
app.use((err, req, res, next) => {
  console.log("🚩 There was an error 🙃");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Sorry, something went wrong"; // Use err.message here

  return res.status(errStatus).json({
    message: errMessage, // Send the error message to the client
  });
});

// Listening on port
app.listen(process.env.PORT, () => {
  console.log(`👽 API ${process.env.PORT} is running 😁`);
});
