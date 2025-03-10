import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const commonMiddlewares = (app) => {
  app.use(
    cors({
      origin: [],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
};

export default commonMiddlewares;
