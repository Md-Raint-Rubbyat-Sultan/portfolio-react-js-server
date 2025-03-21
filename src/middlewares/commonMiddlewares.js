import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const commonMiddlewares = (app) => {
  app.use(
    cors({
      origin: [process.env.DEV_URL, process.env.PROD_URL],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
};

export default commonMiddlewares;
