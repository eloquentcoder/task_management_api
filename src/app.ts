import "reflect-metadata";

import dotenv from "dotenv";
import express from "express";
import applyMiddleware from "./app/middleware";
import routes from "./routes";

dotenv.config();

const app = express();

applyMiddleware(app);
app.use("/api", routes);


export default app;