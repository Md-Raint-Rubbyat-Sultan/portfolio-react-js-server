import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// routes
import routes from "./routes/index.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import commonMiddlewares from "./middlewares/commonMiddlewares.js";

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
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
