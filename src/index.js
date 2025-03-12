import express from "express";
import dotenv from "dotenv";

// routes and middlewares paths
import routes from "./routes/index.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import commonMiddlewares from "./middlewares/commonMiddlewares.js";
import DbConnection from "./db/DbConnection/DbConnection.js";

// use of packages
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
commonMiddlewares(app);

// Use routes
app.use("/api/v1", routes);

// error handling middleware
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

// Start the server
(async () => {
  // connect the db here to ensure the connection first
  console.log("connecting to db");
  await DbConnection();
  console.log("Db connected");
  // listening the port
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
